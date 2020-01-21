using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.Models.DataRecord
{
    public class FuncionAdminRecord:BaseDataRecord
    {
        public int FuncionAdminId { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string MenuLargo { get; set; }
        public string MenuCorto { get; set; }
        public int FuncionPadreId { get; set; }
        public bool Activo { get; set; }
    }
}