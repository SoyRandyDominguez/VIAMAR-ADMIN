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
using Servicios.Logic;
using Servicios.Model;
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
        [HttpPost]
        [Route("getCitaByIDForEdit")]
        public ResponseContenido<Cita> getCitaByIDForEdit(RequestContenido<Cita> request)
        {
            return CitaLogic.getCitaByIDForEdit(request);
        }

        [HttpPost, Route("GetCitas")]
        public ResponseContenido<CitaForList> GetCitas(RequestContenido<CitaForList> request)
        {
            var response = CitaRepository.getAllCitas(request);
            return response;
        }

        [HttpPost]
        [Route("CrearCita")]
        public ResponseContenido<Cita> CrearCita(RequestContenido<Cita> request)
        {
            var response = CitaLogic.CrearCita(request);
            return response;
        }

        [HttpPost]
        [Route("UpdateCita")]
        public ResponseContenido<Cita> UpdateCita(RequestContenido<Cita> request)
        {
            var response = CitaLogic.UpdateCita(request);
            return response;
        }

    }
}
