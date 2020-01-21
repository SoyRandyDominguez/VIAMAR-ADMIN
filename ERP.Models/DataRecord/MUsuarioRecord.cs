using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Models.DataRecord
{
   public class MUsuarioRecord: BaseDataRecord
    {
       
        public int UsuarioID { get; set; }
        
        public string UsuNombre { get; set; }
        
        public string UsuApellido { get; set; }
        
        public string UsuCedula { get; set; }

        public DateTime UsuFechaNac { get; set; }
        
        public string UsuUserName { get; set; }
        
        public string UsuClave { get; set; }

        public DateTime UsuVenceClave { get; set; }

        public bool UsuActivo { get; set; }

        public int UsuNivel { get; set; }
        
        public string UsuComentario { get; set; }
    }
}
