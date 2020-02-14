using Public.DataAccess;
using Public.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;
using Usuarios.Model;
using Usuarios.Query;

namespace Usuarios.Repository
{
    public class UsuarioRepository : BaseRepository
    {

        public static ResponseContenido<Usuario> RegistrarUsuario(Usuario usuario)
        {
            var response = new ResponseContenido<Usuario>();
            try
            {
                if (usuario == null)
                    throw new Exception("Objeto vacío.");

                if (GetUsuario(usuario.UserName) != null)
                    throw new Exception("Este usuario existe.");

                CreatePasswordHash(usuario.Password, out byte[] passwordHash, out byte[] passwordSalt);

                usuario.PasswordHash = passwordHash;
                usuario.PasswordSalt = passwordSalt;

                Query(UsuarioQuery.insertUsuario, usuario);
            }
            catch (Exception e)
            {
                response.OK = false;
                response.Errores.Add(e.Message);
            }
            return response;
        }

        public static Usuario GetUsuario(string userName)
        {
            var resultados = Query<Usuario>(UsuarioQuery.selectUsuario_ByUserName, new { userName });
            return resultados.Count > 0 ? resultados[0] : null;
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

    }
}
