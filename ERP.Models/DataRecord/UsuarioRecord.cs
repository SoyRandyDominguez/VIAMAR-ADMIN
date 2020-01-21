using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.SqlServer.Server;
using System.Data;

namespace ERP.Models.DataRecord
{
    public class UsuarioRecord : BaseDataRecord
    {
        public int UsuarioId { get; set; }
        public string Nombre { get; set; }
        public string Celular { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }
        public DateTime Creado { get; set; }
        public DateTime? Expiracion { get; set; }
        public DateTime? BloqueadoHasta { get; set; }
        public int? IntentosFallidos { get; set; }
        public List<PermisoUsuarioRecord> Permisos { get; set; }
    }
}