using Public.DataAccess;
using Public.DataAccess.Models;
using Servicios.Model.ViewModel;
using Servicios.Query;
using System;
using System.Collections.Generic;
using System.Text;

namespace Servicios.Repository
{
    public class CitaRepository : BaseRepository
    {

        public static ResponseContenido<CitaForList> getAllCitas(RequestContenido<CitaForList> request)
        {
            var response = new ResponseContenido<CitaForList>();
            try
            {
                var results = QueryConPaginacion<CitaForList>(CitaQuery.selectAllCitasFromVCitasListado, request.Parametros, request.Pagina);
                response.Records = results.Records;
                response.Pagina = results.Pagina;
            }
            catch (Exception e)
            {
                response.Errores.Add(e.Message);
                response.OK = false;
            }
            return response;
        }


    }
}
