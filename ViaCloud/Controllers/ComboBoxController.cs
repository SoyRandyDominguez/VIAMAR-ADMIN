using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Public.DataAccess.Models;
using Public.DataAccess.Repository;
using Public.Model;


namespace ViaCloud.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ComboBoxController : ControllerBase
    {

        [HttpPost]
        [Route("GetHorasDisponiblesCita")]
        public ResponseContenido<ComboBox> GetHorasDisponiblesCita(RequestContenido<ComboBox> rq)
        {
            var response = ComboBoxRepository.GetHorasDisponiblesCita(rq);
            return response;
        }

        [HttpPost]
        [Route("GetSintomasComboBox")]
        public ResponseContenido<ComboBox> GetSintomasComboBox(RequestContenido<ComboBox> rq)
        {
            return ComboBoxRepository.GetSintomasComboBox(rq);
        }
        [HttpPost]
        [Route("GetChasisPorCliente")]
        public ResponseContenido<ComboBox> GetChasisPorCliente(RequestContenido<ComboBox> rq)
        {
            return ComboBoxRepository.GetChasisPorCliente(rq);
        }
        [HttpPost]
        [Route("GetDocumentosTipo")]
        public ResponseContenido<ComboBox> GetDocumentosTipo(RequestContenido<ComboBox> rq)
        {
            return ComboBoxRepository.GetDocumentosTipo(rq);
        }

        [HttpPost]
        [Route("GetClientesComboBox")]
        public ResponseContenido<ComboBox> GetClientesComboBox(RequestContenido<ComboBox> rq)
        {
            return ComboBoxRepository.GetClientesComboBox(rq);
        }

        [HttpPost]
        [Route("GetServiciosComboBox")]
        public ResponseContenido<ComboBox> GetServiciosComboBox(RequestContenido<ComboBox> rq)
        {
            return ComboBoxRepository.GetServiciosComboBox(rq);
        }
        [HttpPost]
        [Route("GetChasisByID")]
        public ResponseContenido<ComboBox> GetChasisByID(RequestContenido<ComboBox> rq)
        {
            return ComboBoxRepository.GetChasisByID(rq);
        }
    }
}
