using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERP.DataAccess.Helpers
{
    public class CommonHelpers
    {
        public class ValueWrapper<T>
        {
            public T Value { get; set; }
            public bool HasValue { get; set; }

            public ValueWrapper()
            {
                HasValue = false;
            }
        }
        public static ValueWrapper<T> GetDictionaryValue<T>(IDictionary<string, object> dictionary, string key)
        {
            ValueWrapper<T> t = new ValueWrapper<T>();

            object x = null;
            if (dictionary.TryGetValue(key, out x))
            {
                if (x.GetType() == typeof(T))
                {
                    t.Value = (T)x;
                    t.HasValue = true;
                }
            }

            return t;
        }
    }
}
