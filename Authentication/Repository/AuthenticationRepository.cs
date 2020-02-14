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

namespace Authentication.Repository
{
    public class AuthenticationRepository : BaseRepository
    {
        public static ResponseContenido<Usuario> Login(UserForLogin userForLogin)
        {
            var response = new ResponseContenido<Usuario>();
            try
            {
                var user = UsuarioRepository.GetUsuario(userForLogin.Usuario);

                if (user == null)
                    throw new Exception("Este usuario no existe.");

                if (!VerifyPassswordHash(userForLogin.Password, user.PasswordHash, user.PasswordSalt))
                    throw new Exception("Password inválido.");






            }
            catch (Exception e)
            {
                response.OK = false;
                response.Errores.Add(e.Message);
            }
            return response;
        }

        private static bool VerifyPassswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
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
