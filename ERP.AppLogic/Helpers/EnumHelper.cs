using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.AppLogic.Helpers
{
    public static class EnumHelper
    {
        public static T ParseEnumFromString<T>(string pValue)
        {
            return (T)Enum.Parse(typeof(T), pValue);
        }
    }


}
