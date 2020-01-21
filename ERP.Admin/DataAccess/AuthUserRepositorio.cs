using ERP.AppLogic.Encryption;
using ERP.Controllers;
using ERP.DataAccess.Helpers;
using ERP.Models.DataRecord;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Web;

namespace ERP.DataAccess
{
    public class AuthUserRepositorio : BaseRepository
    {

        internal static UserAuthDataController.ResponseContenido GetUserAuth(UserAuthDataController.RequestContenido request)
        {
            var response = new UserAuthDataController.ResponseContenido();
            response.Records = new List<AuthUserRecord>();
            response.Mensajes = new List<string>();
            response.OK = false;
            try
            {
                string Username = CommonHelpers.GetDictionaryValue<string>(request.Parametros, "Username").Value;  
                string Clave = CommonHelpers.GetDictionaryValue<string>(request.Parametros, "Clave").Value;


                AuthUserRecord user = Query<AuthUserRecord>(@"select top 1  UsuarioID id, UsuNombre FirstName, UsuApellido 
                                                    LastName,email, UsuUserName Username, UsuClave Password from MUsuarios where UsuUserName = @Username and UsuClave = @Clave ",
                                                    new { Username= Username, Clave= Encryptor.EncryptPassword(Clave)}).FirstOrDefault();

                if (user == null)
                {
                    response.OK = false;
                    response.Errores.Add("No pudimos completar la autorizacion, por favor intente de nuevo.");
                    return response;
                }
                user.Permisos = new List<FuncionAdmin>();
                user.Permisos = Query<FuncionAdmin>(@"select mu.UsuarioID , fa.Id FuncionId ,fa.MenuCorto PermisoNombre , fa.FuncionPadreId from RFuncionAdminUsuario fau
                                                        join MUsuarios mu on mu.UsuarioID = fau.UsuarioID
                                                        join FuncionAdmin fa on fa.Id = fau.FuncionAdminID 
                                                        where mu.UsuarioID = @ID", new { ID = user.Id });

                user.Role = "Usuario";
                // authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[] {  new Claim(ClaimTypes.Name, user.Id.ToString()), new Claim(ClaimTypes.Role, user.Role) }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                user.Token = tokenHandler.WriteToken(token);

                // remove password before returning
                user.Password = null;
                response.OK = true;
                response.Records.Add(user);
            }
            catch (Exception e)
            {
                response.Errores.Add("Error Interno: "+e.Message);
                response.OK = false;
                //GeneralMethods.GuardarLog("ComboBoxRepositorio", $"Ha ocurrido un error al momento de realizar la operacion. Error causado:{e.Message}. La operacion fue realizada por el usuario:", "0", 0);
                return response;
            }

            return response;
        }




    }
}