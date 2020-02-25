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
    public class SintomaController : ControllerBase
    {

        [HttpPost, Route("GetSintomasByCitaID")]
        public ResponseContenido<SintomaViewModel> GetSintomasByCitaID(RequestContenido<SintomaViewModel> request)
        {
            var response = new ResponseContenido<SintomaViewModel>();
            try
            {
                string citaIDString = request.Parametros.Find(p => p.Key == "citaID").Value.ToString();
                int.TryParse(citaIDString, out int citaID);

                List<SintomaViewModel> sintomas = SintomaRepository.GetSintomasByCitaID(citaID);
                response.Records = sintomas;

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
