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
using Servicios.Model.ViewModel;
using Servicios.Repository;
using Usuarios.Model;
using Usuarios.Repository;

namespace ViaCloud.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CitaController : ControllerBase
    {

        [HttpPost, Route("GetCitas")]
        public ResponseContenido<CitaForList> GetCitas(RequestContenido<CitaForList> request)
        {
            var response = CitaRepository.getAllCitas(request);
            return response;
        }

    }
}
