using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Public.DataAccess.Models
{
    public class RequestContenido<T>
    {
        public List<T> Records { get; set; }
        //public Dictionary<string, object> Parametros { get; set; }
        public List<Parametro> Parametros { get; set; }
        public Paginacion Pagina { get; set; }
    }
}