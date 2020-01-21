using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Models.DataRecord
{
    public class MUsuariosRecord : BaseDataRecord
    {
        public int UsuarioID { get; set; }
        public int TipoUsuarioID { get; set; }
        public string UsuNombre { get; set; }
        public string UsuUserName { get; set; }
        public string UsuApellido { get; set; }
        public string UsuCedula { get; set; }
        public string UsuFechaNac { get; set; }
        public string UsuClave { get; set; }
        public string UsuComentario { get; set; }
        public int UsuNivel { get; set; }
        public bool UsuActivo { get; set; }
        public string NivelUsuarioPalabra { get; set; }
        public string Email { get; set; }
    }

    public class RiferoUsuario : BaseDataRecord
    {
        public int UsuarioID { get; set; }
        public int RiferoID { get; set; }
        public string RifNombre { get; set; }
        public bool isChecked { get; set; }
    }





    public class PermisosUsuario : BaseDataRecord
    {
        public string permisoID { get; set; }
        public string permisoPadreID { get; set; }
        public string nombre { get; set; }
        public int nivel { get; set; }
        public bool isChecked { get; set; }
        public bool hasChild { get; set; }
        public bool expanded { get; set; }


    }

}
