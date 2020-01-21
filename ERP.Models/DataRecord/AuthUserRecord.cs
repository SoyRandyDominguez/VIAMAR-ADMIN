using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Models.DataRecord
{
    public class AuthUserRecord : BaseDataRecord
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
        public string Email { get; set; }
        public List<FuncionAdmin> Permisos { get; set; }

    }

    public class FuncionAdmin
    {
        public int UsuarioID { get; set; }
        public int FuncionId { get; set; }
        public string PermisoNombre { get; set; }
        public int FuncionPadreId { get; set; }

    }
  
}
