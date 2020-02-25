using System;
using System.Collections.Generic;
using System.Text;

namespace Public.DataAccess.Repository
{
    public class PublicRepository : BaseRepository
    {
        public static DateTime GetHoraActual()
        {
            var results = QueryObject<DateTime>("select getdate()", null);
            return results[0];
        }



    }
}
