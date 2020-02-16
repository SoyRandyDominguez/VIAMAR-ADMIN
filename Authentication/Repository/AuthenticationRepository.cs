using Authentication.Interface;
using Authentication.Models;
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

namespace Authentication.Repository
{
    public class AuthenticationRepository : BaseRepository
    {

      
        //public static ResponseContenido<Usuario> Login(UserForLogin userForLogin)
        //{
           
        //}

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
