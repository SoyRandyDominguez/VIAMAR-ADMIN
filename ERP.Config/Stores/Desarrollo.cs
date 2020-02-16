using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ERP.Config
{
    internal static partial class Settings
    {



        internal static string[] DNSHosts = { "localhost", "localhost" }; //El primero es el default
        internal static string[] ClientPorts = { "80", "80" }; //El primero es el default, ultimo es el backup, los demas son backwards compatibility
        internal static string ClientEnableLog = @"1";
        internal static string DBServerName = @"179.51.76.170";// @"SQLHAPROD01.Finanzas.gov.do";
        internal static string DataName = @"viamar";
        internal static string DBPwd1 = @"Aguila05";
        internal static string DBPwd2 = @"Aguila05";
        internal static string ServiceProtocol = @"http";
        internal static string ServiceFolder = @"";
        internal static string ServiceFile = @"";
        internal static string DBUser1 = @"sa";
        internal static string DBUser2 = @"sa";



    }
}