using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ERP.AppLogic.Helpers
{
    public static class JSONHelper
    {
        public static T CreateNewFromJSON<T>(String pJSON)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject<T>(pJSON);
        }

        public static string SerializeToJSON(object pObject)
        {
            return JsonConvert.SerializeObject(pObject, Formatting.Indented,
                      new JsonSerializerSettings
                      {
                          PreserveReferencesHandling = PreserveReferencesHandling.Objects
                      });
        }
    }
}
