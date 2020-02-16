using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Public.DataAccess.Models
{
    public class ListadoRecords<T> where T : BaseDataRecord
    {
        public List<T> Records { get; set; }
        public Paginacion Pagina { get; set; }
    }
}