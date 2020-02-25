using Public.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Servicios.Model.ViewModel
{
    public class SintomaViewModel : BaseDataRecord
    {
        public int SintomaID { get; set; }
        public int CitaID { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }

    }
}
