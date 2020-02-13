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


                AuthUserRecord user = Query<AuthUserRecord>(@"  select top 1  ID id, Nombres FirstName, Apellidos LastName,email, Username Username, r.Nombre Role,
													password Password from [dbo].[Usuario] u
                                                    join Rol r on r.RolID = u.RolID
													where Username = @Username and password = @Clave ",
                                                    //new { Username= Username, Clave= Encryptor.EncryptPassword(Clave)}).FirstOrDefault();
                                                    new { Username= Username, Clave= Clave}).FirstOrDefault();

                if (user == null)
                {
                    response.OK = false;
                    response.Errores.Add("No pudimos completar la autorizacion, por favor intente de nuevo.");
                    return response;
                }


                var sucursales = Query<ComboBoxRecord>(@"  select s.ID Codigo,s.Nombre, c.Nombre Grupo, c.ID GrupoID from Sucursal s 
                                                    join UsuarioSucursalEnrroll usr on usr.SucursalID = s.ID
                                                    join Compania c on c.ID = s.CompaniaID
                                                    where usr.UsuarioID =  @ID", new { ID = user.Id });





                if (sucursales == null)
                {
                    response.OK = false;
                    response.Errores.Add("No pudimos completar la autorizacion, Este usuario no pertenece a ninguna sucursal.");
                    return response;
                }

                response.Valores.Add(sucursales);

                user.Permisos = new List<FuncionAdmin>();
                user.Permisos = Query<FuncionAdmin>(@"													 
	            select u.ID UsuarioID , p.PermisoID FuncionId , p.Nombre PermisoNombre, p.PermisoPadreID FuncionPadreId from Permiso p
	            join RolPermisoEnrroll rp on rp.PermisoID = p.PermisoID
	            join Rol r on r.RolID = rp.RolID
	            join Usuario u on u.RolID = r.RolID
	            where u.ID = @ID", new { ID = user.Id });

                if (user.Permisos == null)
                {
                    response.OK = false;
                    response.Errores.Add("No pudimos completar la autorizacion, Este usuario no posee permisos.");
                    return response;
                }


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