using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.Models.DataRecord
{
    public class PermisoUsuarioRecord:BaseDataRecord
    {
        public int UsuarioId { get; set; }
        public int FuncionAdminId { get; set; }
    }
}