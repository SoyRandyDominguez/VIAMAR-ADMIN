using System;
using System.Collections.Generic;
using System.Text;

namespace Usuarios.Model
{
    public class UsuarioForLogin
    {
        public string Usuario { get; set; }
        public string Password { get; set; }
        public int SucursalID { get; set; }
    }
}
