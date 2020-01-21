using ERP.AppLogic.Encryption;
using ERP.Controllers;
using ERP.DataAccess.Helpers;
using ERP.Models.DataRecord;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace ERP.DataAccess
{
    public class PermisosUsuariosRepositorio : BaseRepository
    {
        internal static PermisosUsuarioDataController.ResponseContenido GetPermisosByUsuarioID(PermisosUsuarioDataController.RequestContenido request)
        {
            var response = new PermisosUsuarioDataController.ResponseContenido();

            try
            {
                var listado = Query<PermisosUsuario>(MUsuarioHelper.GetPermisosUsuario, request.Parametros);

                response.Records = listado;
                response.OK = true;

            }
            catch (Exception ex)
            {
                //GeneralMethods.GuardarLog($" Usuarios listado", $"Ha ocurrido un error al momento de realizar la operacion. Error causado:{ex.Message}. La Operacion fue realizada por el usuario:", "0", 0);
                response.Errores.Add(ex.Message);
                return response;
            }



            return response;
        }


        internal static PermisosUsuarioDataController.ResponseContenido GetPermisosByTipo(PermisosUsuarioDataController.RequestContenido request)
        {
            var response = new PermisosUsuarioDataController.ResponseContenido();

            try
            {
                var listado = Query<PermisosUsuario>(MUsuarioHelper.GetPermisosUsuario, request.Parametros);

                response.Records = listado;
                response.OK = true;

            }
            catch (Exception ex)
            {
                //GeneralMethods.GuardarLog($" Usuarios listado", $"Ha ocurrido un error al momento de realizar la operacion. Error causado:{ex.Message}. La Operacion fue realizada por el usuario:", "0", 0);
                response.Errores.Add(ex.Message);
                return response;
            }



            return response;
        }

        internal static PermisosUsuarioDataController.ResponseContenido SetPermisosByUsuarioID(PermisosUsuarioDataController.RequestContenido request)
        {

            var response = new PermisosUsuarioDataController.ResponseContenido();

            try
            {
                string pUsuarioID = request.Parametros["UsuarioID"].ToString();
                int.TryParse(request.Parametros["balanceMinimoCaja"].ToString(), out int balanceMinimoCaja);

                List<object> list = new List<object>();

                request.Records.ForEach(x =>
                {
                    list.Add(new { FuncionAdminID = x.permisoID, UsuarioID = pUsuarioID });
                });


                ExecuteScalar<PermisosUsuario>(MUsuarioHelper.deletePermisosUsuario, request.Parametros);
                if (list.Any())
                {
                    ExecuteScalarList(MUsuarioHelper.setPermisosUsuario, list);
                }


              

                response.OK = true;

            }
            catch (Exception ex)
            {
                //GeneralMethods.GuardarLog($" Usuarios listado", $"Ha ocurrido un error al momento de realizar la operacion. Error causado:{ex.Message}. La Operacion fue realizada por el usuario:", "0", 0);
                response.Errores.Add(ex.Message);
                return response;
            }



            return response;
        }

    }
}