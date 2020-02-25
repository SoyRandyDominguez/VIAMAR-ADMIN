using Public.DataAccess;
using Public.DataAccess.Models;
using Servicios.Model;
using Servicios.Model.ViewModel;
using Servicios.Query;
using System;
using System.Collections.Generic;
using System.Text;

namespace Servicios.Repository
{
    public class SintomaRepository : BaseRepository
    {

        public static void CrearSintomaACita(SintomaViewModel sintoma)
        {
            try
            {
                QueryObject<int>(SintomaQuerys.insertCitaSintomaEnrroll, sintoma);
            }
            catch (Exception e)
            {
                throw e;
            }
        }


        public static void DeleteAllSintomasByCitaID(Cita cita)
        {
            try
            {
                var results = QueryObject<Sintoma>(SintomaQuerys.deleteAllSintomasByCitaID, cita);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static List<SintomaViewModel> GetSintomasByCitaID(int CitaID)
        {
            try
            {
                return QueryObject<SintomaViewModel>(SintomaQuerys.selectAllSintomasByCitaID, new { CitaID });
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
