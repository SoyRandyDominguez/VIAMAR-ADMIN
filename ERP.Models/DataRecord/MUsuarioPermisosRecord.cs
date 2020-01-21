using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Models.DataRecord
{
    public class MUsuarioPermisosRecord : BaseDataRecord
    {

        public int PermisoID { get; set; }
        public string Nombre { get; set; }
        public int Checked { get; set; }
    }

}
