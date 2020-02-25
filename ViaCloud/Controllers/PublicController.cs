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
using Public.DataAccess.Repository;
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
    public class PublicController : ControllerBase
    {

        [HttpPost]
        [Route("GetHoraActual")]
        public ResponseContenido<object> GetHoraActual(RequestContenido<object> rq)
        {
            var response = new ResponseContenido<object>();
            try
            {
                DateTime date = PublicRepository.GetHoraActual();
                response.Valores.Add(date);
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
