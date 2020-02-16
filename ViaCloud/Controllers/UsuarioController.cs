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

    }
}
