using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Authentication.Models;
using Authentication.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Public.DataAccess.Models;
using Usuarios.Model;
using Usuarios.Repository;

namespace ViaCloud.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {

        private readonly IConfiguration _config;
        public AuthenticationController(IConfiguration configuration)
        {
            this._config = configuration;
        }


        [HttpPost, Route("Login")]
        public ResponseContenido<Usuario> Login(UserForLogin userForLogin)
        {
            var response = new ResponseContenido<Usuario>();
            try
            {
                var user = UsuarioRepository.GetUsuarioForToken(userForLogin.Usuario);

                if (user == null)
                    throw new Exception("Este usuario no existe.");

                if (!AuthenticationRepository.VerifyPassswordHash(userForLogin.Password, user.PasswordHash, user.PasswordSalt))
                    throw new Exception("Password inválido.");

                //var permisos = UsuarioRepository.


                var claims = new[]
                {
                     new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                     new Claim(ClaimTypes.Name,user.UserName),
                     new Claim(ClaimTypes.Locality,user.SucursalID.ToString()),
                     new Claim(ClaimTypes.Role,user.Rol),
                     new Claim(ClaimTypes.Email, user.Email),

                };

                //var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("TOKEN_SECRETO")));

                var key = new SymmetricSecurityKey(Encoding.UTF8.
                    GetBytes(this._config.GetSection("AppSettings:Token").Value));

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

                response.Valores.Add(tokenClient);

            }
            catch (Exception e)
            {
                response.OK = false;
                response.Errores.Add(e.Message);
            }
            return response;
        }

    }
}
