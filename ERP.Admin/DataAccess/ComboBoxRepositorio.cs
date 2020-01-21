using ERP.Controllers;
using ERP.Models.DataRecord;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERP.DataAccess
{
    public class ComboBoxRepositorio : BaseRepository
    {

        internal static ComboBoxDataController.ResponseContenido ComboSorteos(ComboBoxDataController.RequestContenido request)
        {
            var response = new ComboBoxDataController.ResponseContenido();
            try
            {
                var list = Query<ComboBoxRecord>(@"select SorteoID Codigo, s.Nombre,L.Nombre Grupo  from RF_Sorteo s
                                                    join RF_Loteria L on L.LoteriaID = s.LoteriaID
                                                    order by s.Nombre ");
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

        internal static ComboBoxDataController.ResponseContenido ComboSorteoJugadaBySorteoID(ComboBoxDataController.RequestContenido request)
        {
            var response = new ComboBoxDataController.ResponseContenido();
            try
            {
                var list = Query<ComboBoxRecord>(@"select stj.Nombre Nombre, stj.SorteoTipoJugadaID Codigo, s.Nombre Grupo from RF_Sorteo s
                                                join RF_SorteoTipo st on st.SorteoTipoID = s.SorteoTipoID
                                                join RF_SorteoTipoJugada stj on stj.SorteoTipoID = st.SorteoTipoID
                                                where s.SorteoID = @SorteoID ", request.Parametros);
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


        internal static ComboBoxDataController.ResponseContenido ComboSorteosTipo(ComboBoxDataController.RequestContenido request)
        {
            var response = new ComboBoxDataController.ResponseContenido();
            try
            {
                //var list = Query<ComboBoxRecord>("select SorteoID as Codigo, Nombre as Nombre from rf_sorteo order by Nombre ");
                var list = Query<ComboBoxRecord>("select SorteoTipoID as Codigo, Nombre from rf_sorteotipo order by Nombre");
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

        internal static ComboBoxDataController.ResponseContenido GetZonas(ComboBoxDataController.RequestContenido request)
        {


            var response = new ComboBoxDataController.ResponseContenido();
            try
            {
                var list = Query<ComboBoxRecord>("select ZonaID as Codigo, Nombre as Nombre from mzonas where activa = 1");
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

        internal static ComboBoxDataController.ResponseContenido EsquemasPagoBySorteo(ComboBoxDataController.RequestContenido request)
        {


            var response = new ComboBoxDataController.ResponseContenido();
            try
            {

                //var parametros = DiccionaryHelper.DictionaryToObject<ConfiguracionesRecord>(request.Parametros);

                var list = Query<ComboBoxRecord>(@"select EsquemaPagoID as Codigo, ep.Nombre as Nombre from RF_EsquemaPago ep
                                                    join RF_Sorteo s on s.SorteoTipoID = ep.SorteoTipoID
                                                    where SorteoID = @SorteoID", request.Parametros);

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


        internal static ComboBoxDataController.ResponseContenido GetLoterias(ComboBoxDataController.RequestContenido request)
        {


            var response = new ComboBoxDataController.ResponseContenido();
            try
            {

                //var parametros = DiccionaryHelper.DictionaryToObject<ConfiguracionesRecord>(request.Parametros);

                var list = Query<ComboBoxRecord>("select LotNombre as Nombre, LoteriaID as Codigo from TLoterias", request.Parametros);

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

        internal static ComboBoxDataController.ResponseContenido GetBancas(ComboBoxDataController.RequestContenido request)
        {


            var response = new ComboBoxDataController.ResponseContenido();
            try
            {

                //var parametros = DiccionaryHelper.DictionaryToObject<ConfiguracionesRecord>(request.Parametros);

                var list = Query<ComboBoxRecord>("select BanNombre as Nombre, BancaID as Codigo from MBancas  where  RiferoID = @RiferoID", request.Parametros);

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
        internal static ComboBoxDataController.ResponseContenido GetRiferos(ComboBoxDataController.RequestContenido request)
        {

            var response = new ComboBoxDataController.ResponseContenido();
            try
            {

                //var parametros = DiccionaryHelper.DictionaryToObject<ConfiguracionesRecord>(request.Parametros);

                var list = Query<ComboBoxRecord>(" select r.RifNombre as nombre, r.RiferoID as codigo, z.Nombre as Grupo from MRiferos r  left join MZonas z on r.ZonaID= z.ZonaID ", request.Parametros);

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
        internal static ComboBoxDataController.ResponseContenido GetMensajeros(ComboBoxDataController.RequestContenido request)
        {

            var response = new ComboBoxDataController.ResponseContenido();
            try
            {

                //var parametros = DiccionaryHelper.DictionaryToObject<ConfiguracionesRecord>(request.Parametros);

                var list = Query<ComboBoxRecord>("select mu.UsuarioID Codigo,(mu.UsuNombre+' '+mu.UsuApellido) Nombre ,mu.TipoUsuarioID GrupoID from MUsuarios mu where mu.TipoUsuarioID=2 ", request.Parametros);

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

        internal static ComboBoxDataController.ResponseContenido getEsquemaGrupo(ComboBoxDataController.RequestContenido request)
        {
            var response = new ComboBoxDataController.ResponseContenido();
            try
            {
                var list = Query<ComboBoxRecord>(@" select nombre,GrupoID as codigo from Rf_EsquemaGrupo", request.Parametros);
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

        internal static ComboBoxDataController.ResponseContenido getEsquemasPago(ComboBoxDataController.RequestContenido request)
        {
            var response = new ComboBoxDataController.ResponseContenido();
            try
            {
                //var list = Query<ComboBoxRecord>(@"select e.Nombre,e.EsquemaPagoID as codigo,s.SorteoID as grupo from RF_EsquemaPago e
                //                                    join RF_Sorteo s on s.SorteoTipoID = e.SorteoTipoID", request.Parametros);
                var list = Query<ComboBoxRecord>(@"select s.SorteoTipoID as codigo, e.Nombre from RF_EsquemaPago e 
                                                    join RF_SorteoTipo s on s.SorteoTipoID = e.SorteoTipoID", request.Parametros);
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


        internal static ComboBoxDataController.ResponseContenido ComboCajas(ComboBoxDataController.RequestContenido request)
        {
            var response = new ComboBoxDataController.ResponseContenido();
            try
            {
                var list = Query<ComboBoxRecord>(@"declare @tab table(
                                                    codigo int,
                                                    Nombre varchar(100),
                                                    GrupoID int
                                                    )
                                                    insert into @tab
                                                      select  c.CajaID codigo,  m.BanContacto As Nombre, c.TipoCajaID GrupoID from flujo.Caja c join dbo.MBancas m on c.BancaID =  m.BancaID
                                                      union all
                                                      select  c.CajaID codigo, CONCAT(u.UsuNombre,' ',U.UsuApellido) As Nombre, c.TipoCajaID from flujo.Caja c join dbo.MUsuarios u on c.UsuarioID =  u.UsuarioID
                                                      union all
                                                      select c.CajaID codigo,   c.CajaDescripcion As Nombre, c.TipoCajaID from flujo.Caja c where c.TipoCajaID = 3

                                                      select t.*, tc.Referencia Grupo from @tab 
                                                    T join flujo.TipoCaja Tc on T.GrupoID  =  Tc.TipoCajaID ");
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

        internal static ComboBoxDataController.ResponseContenido GetTiposUsuarios(ComboBoxDataController.RequestContenido request)
        {
            var response = new ComboBoxDataController.ResponseContenido();
            try
            {
                var list = Query<ComboBoxRecord>(@"select tu.Tipo as Nombre,tu.TipoUsuarioID as Codigo from flujo.TipoUsuario tu");
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
        
         internal static ComboBoxDataController.ResponseContenido GetSuggestToFaltantesSobrantes(ComboBoxDataController.RequestContenido request)
        {
            var response = new ComboBoxDataController.ResponseContenido();
            try
            {
                var list = Query<ComboBoxRecord>(@"
                            select BancaID codigo, concat(BancaID,' - ',BanNombre) nombre, 1 GrupoID , 'Banca' Grupo from MBancas
                                union all
                            select RiferoID codigo, concat(RiferoID,' - ',RifNombre) nombre, 2 GrupoID , 'Rifero' Grupo from MRiferos
                                union all
                            select UsuarioID codigo , concat(UsuarioID,' - ',UsuUserName) nombre, 3 GrupoID , 'Usuario' Grupo from MUsuarios ");
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

        internal static ComboBoxDataController.ResponseContenido GetListaOpciones(ComboBoxDataController.RequestContenido request)
                {
                    var response = new ComboBoxDataController.ResponseContenido();
                    try
                    {
                        var list = Query<ComboBoxRecord>(@"
                                                select lo.OpcionID as Codigo,lo.Nombre as Nombre,lo.LogicKey as GrupoID , lot.Nombre Grupo
                                        from ListaOpciones lo inner join ListaOpcionesTipo lot on lo.LogicKey = lot.LogicKey
                                           where lot.Activa=1 and lo.activo=1 and lot.LogicKey =@LogicKey", request.Parametros);
                        response.Records = list;
                        response.OK = true;
                    }
                    catch (Exception e)
                    {
                        response.Errores.Add(e.Message);
                        response.OK = false;
                        //GeneralMethods.GuardarLog("ComboBoxRepositorio", $"Ha ocurrido un error al momento de realizar la operacion. Error causado:{e.Message}. La operacion fue realizada por el usuario:", "0", 0);
                        return response;
                    }            return response;
                }

        internal static ComboBoxDataController.ResponseContenido GetBancasConCuadre(ComboBoxDataController.RequestContenido request)
        {


            var response = new ComboBoxDataController.ResponseContenido();
            try
            {

                //var parametros = DiccionaryHelper.DictionaryToObject<ConfiguracionesRecord>(request.Parametros);

                var list = Query<ComboBoxRecord>(@"
                           select 
                              BancaID As Codigo,
                              BanContacto As Nombre,
                              BanDireccion As Grupo
                           from 
                              dbo.MBancas b
                           where
                              BancaID in (
                                 select BancaID from flujo.Caja where BancaID is not null and TipoCajaID = 1 and CajaID in (select CajaID from flujo.Cuadre where CuadreAnteriorID is null)	
                           )
                                                  ");

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


        internal static ComboBoxDataController.ResponseContenido GetListaOpcionesPrinter(ComboBoxDataController.RequestContenido request)
        {
            var response = new ComboBoxDataController.ResponseContenido();
            try
            {
                var list = Query<ComboBoxRecord>(@"
                                                select lo.OpcionID as Codigo,lo.Nombre as Nombre,lo.LogicKey as GrupoID , lot.Nombre Grupo
                                        from ListaOpciones lo inner join ListaOpcionesTipo lot on lo.LogicKey = lot.LogicKey
                                           where lot.Activa=1 and lo.activo=1 and (lot.LogicKey =@LogicKey1 or lot.LogicKey =@LogicKey2 )", request.Parametros);
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