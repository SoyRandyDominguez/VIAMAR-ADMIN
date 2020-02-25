using Public.DataAccess.Models;
using Public.DataAccess.Query;
using Public.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Public.DataAccess.Repository
{
    public class ComboBoxRepository : BaseRepository
    {
        public static List<ComboBox> GetSucursalesUsuario(int usuarioID)
        {
            var resultados = QueryObject<ComboBox>(ComboBoxQuery.selectSucursalesUsuario, new { usuarioID });
            return resultados;
        }

        public static ResponseContenido<ComboBox> GetSintomasComboBox(RequestContenido<ComboBox> request)
        {
            var response = new ResponseContenido<ComboBox>();
            try
            {
                var list = Query<ComboBox>(@"select s.ID codigo, s.Nombre  from Sintoma s", request.Parametros);
                response.Records = list;
                response.OK = true;
            }
            catch (Exception e)
            {
                response.Errores.Add(e.Message);
                response.OK = false;
                //GeneralMethods.GuardarLog("ComboBoxRepositorio", $"Ha ocurrido un error al momento de realizar la operacion. Error causado:{e.Message}. La operacion fue realizada por el usuario:", "0", 0);
                return response;
            }
            return response;
        }


        public static ResponseContenido<ComboBox> GetHorasDisponiblesCita(RequestContenido<ComboBox> request)
        {
            var response = new ResponseContenido<ComboBox>();
            try
            {
                var list = Query<ComboBox>(ComboBoxQuery.exec_procedure_GethorasDisponibleCita, request.Parametros);
                response.Records = list;
                response.OK = true;
            }
            catch (Exception e)
            {
                response.Errores.Add(e.Message);
                response.OK = false;
                //GeneralMethods.GuardarLog("ComboBoxRepositorio", $"Ha ocurrido un error al momento de realizar la operacion. Error causado:{e.Message}. La operacion fue realizada por el usuario:", "0", 0);
                return response;
            }
            return response;
        }




        public static ResponseContenido<ComboBox> GetDocumentosTipo(RequestContenido<ComboBox> request)
        {
            var response = new ResponseContenido<ComboBox>();
            try
            {
                var list = Query<ComboBox>("select doc.ID codigo, doc.Nombre from Documento doc", request.Parametros);
                response.Records = list;
                response.OK = true;
            }
            catch (Exception e)
            {
                response.Errores.Add(e.Message);
                response.OK = false;
                //GeneralMethods.GuardarLog("ComboBoxRepositorio", $"Ha ocurrido un error al momento de realizar la operacion. Error causado:{e.Message}. La operacion fue realizada por el usuario:", "0", 0);
                return response;
            }
            return response;
        }


        public static ResponseContenido<ComboBox> GetClientesComboBox(RequestContenido<ComboBox> request)
        {
            var response = new ResponseContenido<ComboBox>();
            try
            {
                var list = Query<ComboBox>(@"select ch.ID codigo, 
                                                    CONCAT(ch.Nombres, ' ', ch.Apellidos, ' | ', ch.Documento) nombre
                                                    from Cliente ch
                                                    inner join Sucursal s on s.ID = ch.SucursalID
                                                    inner join Compania co on co.ID = s.CompaniaID
                                                    where co.ID = (select top 1 CompaniaID from Sucursal where ID = @sucursalID)",
                                                request.Parametros);
                response.Records = list;
                response.OK = true;
            }
            catch (Exception e)
            {
                response.Errores.Add(e.Message);
                response.OK = false;
                //GeneralMethods.GuardarLog("ComboBoxRepositorio", $"Ha ocurrido un error al momento de realizar la operacion. Error causado:{e.Message}. La operacion fue realizada por el usuario:", "0", 0);
                return response;
            }
            return response;
        }



        public static ResponseContenido<ComboBox> GetServiciosComboBox(RequestContenido<ComboBox> request)
        {
            var response = new ResponseContenido<ComboBox>();
            try
            {
                var list = Query<ComboBox>(@"select ch.Nombre nombre,ch.ID as codigo from Servicio ch",
                                                request.Parametros);
                response.Records = list;
                response.OK = true;
            }
            catch (Exception e)
            {
                response.Errores.Add(e.Message);
                response.OK = false;
                //GeneralMethods.GuardarLog("ComboBoxRepositorio", $"Ha ocurrido un error al momento de realizar la operacion. Error causado:{e.Message}. La operacion fue realizada por el usuario:", "0", 0);
                return response;
            }
            return response;
        }


        public static ResponseContenido<ComboBox> GetChasisPorCliente(RequestContenido<ComboBox> request)
        {
            var response = new ResponseContenido<ComboBox>();
            try
            {
                var list = Query<ComboBox>(@"select CONCAT(ch.Chasis,' | ',ma.nombre,' | ', mo.nombre, ' | ', mo.ano) nombre,ch.ID as codigo from Vehiculo ch
                                                        inner join Modelo mo on mo.id= ch.ModeloID
                                                        inner join Marca  ma on ma.id=mo.marcaID
														inner join VehiculoClienteEnrroll vcnr on vcnr.VehiculoID = ch.ID
														inner join Cliente cl on cl.ID = vcnr.ClienteID
														where cl.ID = @clienteID", request.Parametros);
                response.Records = list;
                response.OK = true;
            }
            catch (Exception e)
            {
                response.Errores.Add(e.Message);
                response.OK = false;
                //GeneralMethods.GuardarLog("ComboBoxRepositorio", $"Ha ocurrido un error al momento de realizar la operacion. Error causado:{e.Message}. La operacion fue realizada por el usuario:", "0", 0);
                return response;
            }
            return response;
        }

        public static ResponseContenido<ComboBox> GetChasisByID(RequestContenido<ComboBox> request)
        {
            var response = new ResponseContenido<ComboBox>();
            try
            {
                var list = Query<ComboBox>(@"select top 1 CONCAT(ch.Chasis,' | ',ma.nombre,' | ', mo.nombre, ' | ', mo.ano) nombre,ch.ID as codigo from Vehiculo ch
                                                        inner join Modelo mo on mo.id= ch.modeloID
                                                        inner join Marca  ma on ma.id=mo.marcaID
														where ch.ID=@chasisID", request.Parametros);
                response.Records = list;
                response.OK = true;
            }
            catch (Exception e)
            {
                response.Errores.Add(e.Message);
                response.OK = false;
                //GeneralMethods.GuardarLog("ComboBoxRepositorio", $"Ha ocurrido un error al momento de realizar la operacion. Error causado:{e.Message}. La operacion fue realizada por el usuario:", "0", 0);
                return response;
            }
            return response;
        }



    }
}
