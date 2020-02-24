using System;
using System.Collections.Generic;
using System.Text;

namespace Servicios.Model
{
    public class Cita
    {
        public int Id { get; set; }
        public int CitaTipoID { get; set; }
        public string Observaciones { get; set; }//puesta por el receptor
        public string FechaRegistro { get; set; }
        public int Kilometraje { get; set; }//puesta por el receptor
        public DateTime FechaCita { get; set; }
        public string HoraCita { get; set; }
        public string FechaRecepcion { get; set; }
        public string Combustible { get; set; }

        //RELACIONES
        public int TagID { get; set; }
        public int UsuarioCreadorID { get; set; }
        public int UsuarioRecibeID { get; set; }
        public int AsesorID { get; set; }
        public int ClienteID { get; set; }
        public int EstadoID { get; set; }
        public int SucursalID { get; set; }
        public int ServicioTipoID { get; set; }
        public int VehiculoID { get; set; }
    }
}
