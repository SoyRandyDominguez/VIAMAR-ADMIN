using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Usuarios.Model
{
    public class UsuarioForLogin
    {
        [Required]
        public string Usuario { get; set; }
        [Required]
        public string Password { get; set; }
        public int SucursalID { get; set; }
    }
}
