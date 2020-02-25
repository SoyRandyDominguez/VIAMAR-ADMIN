using Newtonsoft.Json;
using Public.DataAccess.Models;
using Servicios.Model;
using Servicios.Model.ViewModel;
using Servicios.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace Servicios.Logic
{
    public class CitaLogic
    {

        public static ResponseContenido<Cita> CrearCita(RequestContenido<Cita> request)
        {
            var response = new ResponseContenido<Cita>();
            try
            {
                string sintomasJSON = request.Parametros.Find(p => p.Key == "sintomas").Value.ToString();
                string citaJSON = request.Parametros.Find(p => p.Key == "cita").Value.ToString();

                List<SintomaViewModel> sintomas = JsonConvert.DeserializeObject<List<SintomaViewModel>>(sintomasJSON);
                Cita cita = JsonConvert.DeserializeObject<Cita>(citaJSON);

                string validaLimiteCitasHora = CitaRepository.ValidaLimiteCitaPorHora(cita);

                if (validaLimiteCitasHora != null)
                {
                    throw new Exception(validaLimiteCitasHora);
                }

                //REGISTRO LA CITA
                int citaID = CitaRepository.CrearCita(cita);

                #region REGISTRO LOS SINTOMAS

                if (sintomas != null && sintomas.Count > 0)
                {
                    sintomas.ForEach(s =>
                    {
                        s.CitaID = citaID;
                        SintomaRepository.CrearSintomaACita(s);
                    });
                }

                #endregion

            }
            catch (Exception e)
            {
                response.OK = false;
                response.Errores.Add(e.Message);
            }

            return response;
        }


        public static ResponseContenido<Cita> UpdateCita(RequestContenido<Cita> request)
        {
            var response = new ResponseContenido<Cita>();
            try
            {
                string sintomasJSON = request.Parametros.Find(p => p.Key == "sintomas").Value.ToString();
                string citaJSON = request.Parametros.Find(p => p.Key == "cita").Value.ToString();

                List<SintomaViewModel> sintomas = JsonConvert.DeserializeObject<List<SintomaViewModel>>(sintomasJSON);
                Cita cita = JsonConvert.DeserializeObject<Cita>(citaJSON);

                //ACTUALIZO LA CITA
                CitaRepository.UpdateCita(cita);

                //BORRO LOS SINTOMAS ANTERIORES
                SintomaRepository.DeleteAllSintomasByCitaID(cita);

                #region REGISTRO LOS SINTOMAS

                if (sintomas != null && sintomas.Count > 0)
                {
                    sintomas.ForEach(s =>
                    {
                        s.CitaID = cita.Id;
                        SintomaRepository.CrearSintomaACita(s);
                    });
                }

                #endregion

            }
            catch (Exception e)
            {
                response.OK = false;
                response.Errores.Add(e.Message);
            }
            return response;
        }



    }
}
