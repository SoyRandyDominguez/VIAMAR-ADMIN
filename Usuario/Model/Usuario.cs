using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Usuarios.Model
{
    public class Usuario
    {
        public int Id { get; set; }

        public string UserName { get; set; }
        public string Password { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }


        public string Documento { get; set; }
        public int DocumentoTipoID { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Email { get; set; }
        public string Imagen { get; set; }
        public int RolID { get; set; }
        public int DealerID { get; set; }
        public string Telefono { get; set; }
        public string Celular { get; set; }
        public int EstadoID { get; set; }
        public int SucursalID { get; set; }
        public string TelefonoExtension { get; set; }

    }
}
