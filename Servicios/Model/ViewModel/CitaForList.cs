using Public.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Servicios.Model.ViewModel
{
    public class CitaForList : BaseDataRecord
    {
        public int CitaID { get; set; }
        public string Chasis { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Documento { get; set; }
        public string Cliente { get; set; }
        public string Servicio { get; set; }
        public DateTime FechaCita { get; set; }
        public string HoraCita { get; set; }
    }
}
