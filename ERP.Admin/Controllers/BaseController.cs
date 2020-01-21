using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ERP.Models.DataModels;
using ERP.Models.DataRecord;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ERP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController<T> : Controller where T : BaseDataRecord
    {


        public class RequestContenido
        {
            public List<T> Records { get; set; }
            public Dictionary<string, object> Parametros { get; set; }
            public Paginacion Pagina { get; set; }
        }

        public class ResponseContenido
        {
            public ResponseContenido()
            {
                Errores = new List<string>();
                Valores = new List<object>();
                Records = new List<T>();
                Mensajes = new List<string>();
                Pagina = new Paginacion();
            }
            public bool OK { get; set; }
            public List<string> Errores { get; set; }
            public List<string> Mensajes { get; set; }
            public List<T> Records { get; set; }
            public List<object> Valores { get; set; }
            public Paginacion Pagina { get; set; }
        }



    }
}