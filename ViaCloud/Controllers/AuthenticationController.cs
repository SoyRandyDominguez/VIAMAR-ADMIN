using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Authentication.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Public.DataAccess.Models;
using Public.DataAccess.Repository;
using Public.Model;
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
        public ResponseContenido<Usuario> Login(UsuarioForLogin userForLogin)
        {
            var response = new ResponseContenido<Usuario>();
            try
            {
                var user = UsuarioRepository.GetUsuarioForToken(userForLogin.Usuario);

                if (user == null)
                    throw new Exception("Este usuario no existe.");

                if (!AuthenticationRepository.VerifyPassswordHash(userForLogin.Password, user.PasswordHash, user.PasswordSalt))
                    throw new Exception("Password inválido.");
                 
                if (user.Rol == null || user.Rol == "")
                    throw new Exception("Este usuario no tiene un rol asignado.");


                //var permisos = UsuarioRepository.



                string tokenClient = AuthenticationRepository.GenerateJwtToken(user, userForLogin.SucursalID);

                response.Valores.Add(tokenClient);

            }
            catch (Exception e)
            {
                response.OK = false;
                response.Errores.Add(e.Message);
            }
            return response;
        }



        [HttpPost, Route("ValidateUser")]
        public ResponseContenido<ComboBox> ValidateUser(UsuarioForLogin userForLogin)
        {
            var response = new ResponseContenido<ComboBox>();
            try
            {
                var user = UsuarioRepository.GetUsuario(userForLogin.Usuario);

                if (user == null)
                    throw new Exception("Este usuario no existe.");

                if (!AuthenticationRepository.VerifyPassswordHash(userForLogin.Password, user.PasswordHash, user.PasswordSalt))
                    throw new Exception("Password inválido.");

                var sucursales = ComboBoxRepository.GetSucursalesUsuario(user.Id);

                if (sucursales == null || sucursales.Count < 1)
                    throw new Exception("Este usuario no posee sucursales");

                response.Records = sucursales;
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
