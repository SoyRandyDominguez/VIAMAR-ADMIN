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
    public class PermisosUsuarioDataController : BaseController<PermisosUsuario>
    {
        [HttpPost]
        [Route("GetPermisosByUsuarioID")]
        public ResponseContenido GetPermisosByUsuarioID(RequestContenido rq)
        {
            return PermisosUsuariosRepositorio.GetPermisosByUsuarioID(rq);
        }

        [HttpPost]
        [Route("CreateOrUpdate")]
        public ResponseContenido SetPermisosByUsuarioID(RequestContenido rq)
        {
            return PermisosUsuariosRepositorio.SetPermisosByUsuarioID(rq);
        }


    }
}
