using Public.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Servicios.Model
{
    public class Sintoma : BaseDataRecord
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
    }
}
