using System;
using System.Collections.Generic;
using System.Text;

namespace Authentication.Models
{
    public class UserForLogin
    {
        public string Usuario { get; set; }
        public string Password { get; set; }
        public int SucursalID { get; set; }
    }
}
