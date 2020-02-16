using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Public.DataAccess.Models
{
    public class ResponseContenido<T>
    {
        public ResponseContenido()
        {
            Errores = new List<string>();
            Valores = new List<object>();
            Records = new List<T>();
            Mensajes = new List<string>();
            Pagina = new Paginacion();
            OK = true;
        }
        public bool OK { get; set; }
        public List<string> Errores { get; set; }
        public List<string> Mensajes { get; set; }
        public List<T> Records { get; set; }
        public List<object> Valores { get; set; }
        public Paginacion Pagina { get; set; }
    }
}