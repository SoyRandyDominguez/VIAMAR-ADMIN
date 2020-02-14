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
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Public.DataAccess.Models;
using Usuarios.Model;

namespace ViaCloud.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {

        [HttpPost, Route("Prueba"), Authorize]
        public void Prueba()
        {
            string x = "";
        }

        [HttpPost, Route("Login")]
        public IActionResult Login(UserForLogin userForLogin)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokeOptions = new JwtSecurityToken(
                issuer: "http://localhost:44399",
                audience: "http://localhost:44399",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signinCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return Ok(new { Token = tokenString });

        }

        [HttpPost, Route("Registrar")]
        public ResponseContenido<Usuario> Registrar(Usuario usuario)
        {
            var response = AuthenticationRepository.Registrar(usuario);
            return response;
        }


    }
}
