using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Authentication.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Public.DataAccess.Models;
using Usuarios.Model;
using Usuarios.Repository;

namespace ViaCloud.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        [HttpPost, Route("Registrar")]
        public ResponseContenido<Usuario> Registrar(Usuario usuario)
        {
            return UsuarioRepository.Registrar(usuario);
        }


        [HttpPost, Route("GetPermisosUsuario")]
        public ResponseContenido<Usuario> GetPermisosUsuario(Usuario usuario)
        {
            var response = new ResponseContenido<Usuario>();
            try
            {
                if (usuario == null)
                    throw new Exception("Objeto vacío.");

                var permisos = UsuarioRepository.GetPermisos(usuario.Id);

                if (permisos == null || permisos.Count < 1)
                    throw new Exception("Este usuario no tiene permisos asignados.");

                response.Valores.Add(permisos);

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
