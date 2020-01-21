using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace ERP.DataAccess.Public
{
    public class GeneralMethods : BaseRepository
    {

        public static void GuardarLog(string TipoOperacion, string Comentario, string Ip, int BancaID = 0)
        {
            //try
            //{
            //    HttpContext context = HttpContext.Current;

            //    var Username = System.Web.HttpContext.Current.Session["UserID"].ToString();
            //    CrealLogEntry(TipoOperacion, Comentario, Username, Ip, BancaID);
            //}
            //catch (Exception e)
            //{
            //    string ErrorMensaje = e.Message;
            //    string ErrorStackTrace = e.StackTrace;
            //}
        }

        public static void EnviarCorreoElectronico(string EmailTo, string EmailSubject, string EmailBody)
        {
            try
            {
                ExecuteScalar<string>(@" 
                 BEGIN TRY
                                                EXEC MSDB.dbo.sp_send_dbmail @Profile_name= 'SistemaMar',
                                                                             @Recipients= @ElCorreo, 
                                                                             @Body_Format= 'HTML',
                                                                             @Subject= @ElTitulo, 
                                                                             @body= @ElBody
                END TRY
                    BEGIN CATCH
                   insert into HLog (BancaID,LogComentario,LogFecha,LogTipo,SecRemoteIP,UsuarioID) values (0,ERROR_MESSAGE(),GETDATE(),@ElTitulo,'',0)
                    END CATCH ", new { ElCorreo = EmailTo, ElTitulo = EmailSubject, ElBody = EmailBody });
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public static void EnviarCodigoSeguridad(string usuarioID, string codigoSeguridad)
        {
            try
            {
                var resultados = Query<int>(@" 
                    declare @Destino varchar(100) = (select email from MUsuarios where usuarioid=@UsuarioID)
                    DECLAre @return_value int 
                    EXEC @return_value = [dbo].EnviarEmailCodigoSeguridad @Codigo ,@Destino 
                    SELECT	'retorno' = @return_value ",
                     new { usuarioID, Codigo = codigoSeguridad });
                if (resultados.FirstOrDefault() != 0)
                {
                    throw new Exception("Ha ocurrido un error al enviar el código de seguridad.");
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public static void EnviarAlertaCambioDeClave(string EmailTo, string nombreUsuarioRealizaOperacion, string usuarioID)
        {
            try
            {
                var resultados = Query<int>(@" 
                    DECLAre @return_value int 
                     EXEC	@return_value = [dbo].[EnviarEmailCambioDeClaveNotificacion] @UsuarioID , @Destino , @NombreCompletoUsuarioCambioClave 
                    SELECT	'retorno' = @return_value ",
                     new { Destino = EmailTo, NombreCompletoUsuarioCambioClave = nombreUsuarioRealizaOperacion, usuarioID });
                if (resultados.FirstOrDefault() != 0)
                {
                    throw new Exception("Ha ocurrido un error al enviar la notificación al usuario.");
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static void GuardarCodigoConfirmacion(string codigo, string usuarioid)
        {
            try
            {
                ExecuteScalar<string>(@"
                DELETE FROM MUsuariosCodigoSeguridad WHERE UsuarioID= @usuarioid;
                INSERT INTO[dbo].[MUsuariosCodigoSeguridad] ([CodigoSeguridad],[UsuarioID],[Confirmado],[fecha]) VALUES(@codigo, @usuarioid, 0,getdate())", new { codigo, usuarioid });
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static bool ValidarCodigoSeguridad(string codigo, string usuarioid)
        {
            try
            {
                List<string> resultados = Query<string>("select top 1 CodigoSeguridad from MUsuariosCodigoSeguridad where CodigoSeguridad = @codigo and UsuarioID = @usuarioid and Confirmado = 0 " +
                    "and fecha = convert(date,getdate()) order by ID desc  ", new { codigo, usuarioid });

                return resultados.Any() ? true : false;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static void AprobarCodigoConfirmacion(string codigo, string usuarioid)
        {
            try
            {
                ExecuteScalar<string>("update MUsuariosCodigoSeguridad set Confirmado = 1 where CodigoSeguridad = @codigo and UsuarioID = @usuarioid  ", new { codigo, usuarioid });
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
