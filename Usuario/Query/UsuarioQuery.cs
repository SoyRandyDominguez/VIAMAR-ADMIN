﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Usuarios.Query
{
    public static class UsuarioQuery
    {

        public static readonly string insertUsuario = @" 
                                                            INSERT INTO [dbo].[usuario] 
                                                            VALUES      (@UserName, 
                                                                         NULL, 
                                                                         @Documento, 
                                                                         @DocumentoTipoID, 
                                                                         @Nombres, 
                                                                         @Apellidos, 
                                                                         @Email, 
                                                                         @Imagen, 
                                                                         @RolID, 
                                                                         @DealerID, 
                                                                         @Telefono, 
                                                                         @EstadoID, 
                                                                         @SucursalID, 
                                                                         @Celular, 
                                                                         @TelefonoExtension, 
                                                                         @PasswordHash, 
                                                                         @PasswordSalt) 
";


        public static string selectUsuario_ByUserName = @"SELECT TOP (1) * FROM [Usuario] U
                                                            WHERE U.USERNAME = @USERNAME";
          public static string selectUsuarioForToken = @"SELECT TOP (1) *,r.nombre as Rol FROM [Usuario] U 
                                                            inner join Rol r on r.id = u.RolID
                                                            WHERE U.USERNAME = @USERNAME";


    }
}
