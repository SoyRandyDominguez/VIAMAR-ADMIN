using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using ERP.Models.DataRecord;
using Microsoft.AspNetCore.Mvc;
using ERP.DataAccess;
namespace ERP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComboBoxDataController : BaseController<ComboBoxRecord>
    {
        [HttpPost]
        [Route("ComboSorteos")]
        public ResponseContenido ComboSorteos(RequestContenido rq)
        {
            return ComboBoxRepositorio.ComboSorteos(rq);
        }
        [HttpPost]
        [Route("ComboSorteosTipo")]
        public ResponseContenido ComboSorteosTipo(RequestContenido rq)
        {
            return ComboBoxRepositorio.ComboSorteosTipo(rq);
        }


        [HttpPost]
        [Route("ComboSorteoJugadaBySorteoID")]
        public ResponseContenido ComboSorteoJugadaBySorteoID(RequestContenido rq)
        {
            return ComboBoxRepositorio.ComboSorteoJugadaBySorteoID(rq);
        }

        [HttpPost]
        [Route("EsquemasPagoBySorteo")]
        public ResponseContenido EsquemasPagoBySorteo(RequestContenido rq)
        {
            return ComboBoxRepositorio.EsquemasPagoBySorteo(rq);
        }
        [HttpPost]
        [Route("getEsquemasPago")]
        public ResponseContenido getEsquemasPago(RequestContenido rq)
        {
            return ComboBoxRepositorio.getEsquemasPago(rq);
        }

        [HttpPost]
        [Route("getEsquemaGrupo")]
        public ResponseContenido getEsquemaGrupo(RequestContenido rq)
        {
            return ComboBoxRepositorio.getEsquemaGrupo(rq);
        }

        [HttpPost]
        [Route("GetLoterias")]
        public ResponseContenido GetLoterias(RequestContenido rq)
        {
            return ComboBoxRepositorio.GetLoterias(rq);
        }
        [HttpPost]
        [Route("GetBancas")]
        public ResponseContenido GetBancas(RequestContenido rq)
        {
            return ComboBoxRepositorio.GetBancas(rq);
        }
        [HttpPost]
        [Route("GetRiferos")]
        public ResponseContenido GetRiferos(RequestContenido rq)
        {
            return ComboBoxRepositorio.GetRiferos(rq);
        }


        [HttpPost]
        [Route("GetZonas")]
        public ResponseContenido GetZonas(RequestContenido rq)
        {
            return ComboBoxRepositorio.GetZonas(rq);
        }



        [HttpPost]
        [Route("GetCajas")]
        public ResponseContenido GetCajas(RequestContenido rq)
        {
            return ComboBoxRepositorio.ComboCajas(rq);
        }

          [HttpPost]
        [Route("GetTiposUsuarios")]
        public ResponseContenido GetTiposUsuarios(RequestContenido rq)
        {
            return ComboBoxRepositorio.GetTiposUsuarios(rq);
        }


}
}
