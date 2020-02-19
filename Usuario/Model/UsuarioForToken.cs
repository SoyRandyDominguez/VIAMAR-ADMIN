using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Usuarios.Model
{
    public class UsuarioForToken
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Rol { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Email { get; set; }
        public string Imagen { get; set; }
        public int SucursalID { get; set; }

    }
}
