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

        public static int CrearCita(Cita cita)
        {
            try
            {
                var results = QueryObject<int>(CitaQuery.insertCita, cita);

                if (results.Count > 0)
                {
                    return results[0];
                }

                throw new Exception("No se pudo generar la cita.");
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static void UpdateCita(Cita cita)
        {
            try
            {
                var results = QueryObject<Cita>(CitaQuery.updateCita, cita);
            }
            catch (Exception e)
            {
                throw e;
            }
        }


        public static string ValidaLimiteCitaPorHora(Cita cita)
        {
            try
            {
                var results = QueryObject<string>(CitaQuery.exec_procedure_Validahoralimitecita,
                    new { cita.SucursalID, cita.FechaCita, cita.HoraCita, TipoCita = cita.CitaTipoID });

                if (results.Count > 0)
                {
                    return results[0];
                }

                return null;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static Cita getCitaByIDForEdit(int citaID)
        {
            var results = QueryObject<Cita>(CitaQuery.getCitaByIDForEdit, new { citaID });
            return results.Count > 0 ? results[0] : null;
        }



    }
}
