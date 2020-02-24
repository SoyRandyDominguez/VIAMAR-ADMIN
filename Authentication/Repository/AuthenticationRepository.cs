using Authentication.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Public.DataAccess;
using Authentication.Query;
using Public.DataAccess.Models;
using Usuarios.Model;
using Usuarios.Repository;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace Authentication.Repository
{
    public class AuthenticationRepository : BaseRepository
    {
        public static string GenerateJwtToken(UsuarioForToken user, int sucursalID)
        {
            var claims = new[]
            {
                     new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                     new Claim(ClaimTypes.Name,user.UserName),
                     new Claim(ClaimTypes.GivenName,user.Nombres + ' '+ user.Apellidos),
                     new Claim(ClaimTypes.Locality,sucursalID.ToString()),
                     new Claim(ClaimTypes.Role,user.Rol),
                     new Claim(ClaimTypes.Email, user.Email),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("TOKEN_SECRETO")));

            //var key = new SymmetricSecurityKey(Encoding.UTF8.
            //    GetBytes(this._config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            string tokenClient = tokenHandler.WriteToken(token);

            return tokenClient;

        }

        public static bool VerifyPassswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                        return false;
                }
            }
            return true;
        }

    }
}
