using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Models.DataRecord
{
    public class HCertificado : BaseDataRecord
    {
        public int CertificadoID { get; set; }
        public int CerNumero { get; set; }
        public int BancaID { get; set; }
        public int CerHwKey { get; set; }
        public DateTime CerFecha { get; set; }
    }
}
