using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.Models.DataRecord
{
    public class ListadoRecords<T> where T:BaseDataRecord
    {
        public List<T> Records { get; set; }
        public DataModels.Paginacion Pagina { get; set; }
    }
}