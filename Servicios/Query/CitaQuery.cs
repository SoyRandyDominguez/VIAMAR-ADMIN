﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Servicios.Query
{
    public static class CitaQuery
    {

        public static string selectAllCitasFromVCitasListado = @" select * from VCitasListado v where
                                                                                                    v.Cliente like '%' + @busquedaText + '%' or 
                                                                                                    v.Modelo  like '%' + @busquedaText + '%'  or
                                                                                                    v.chasis  like '%' + @busquedaText + '%'  or
                                                                                                    v.documento  like '%' + @busquedaText + '%'  or
                                                                                                    v.Servicio  like '%' + @busquedaText + '%'  or
                                                                                                    v.Marca  like '%' + @busquedaText + '%'  ";


        public static string insertCita = @" INSERT INTO [dbo].[Cita]
                                                                       ([SucursalID]
                                                                       ,[ClienteID]
                                                                       ,[FechaRegistro]
                                                                       ,[FechaCita]
                                                                       ,[HoraCita]
                                                                       ,[ServicioTipoID]
                                                                       ,[VehiculoID]
                                                                       ,[UsuarioCreadorID]
                                                                       ,[EstadoID]
                                                                       ,[Combustible]
                                                                       ,[CitaTipoID]
                                                                       ,[UsuarioRecibeID] )
                                                                 VALUES
                                                                       (@SucursalID 
                                                                       ,@ClienteID 
                                                                       ,getdate()
                                                                       ,@FechaCita
                                                                       ,@HoraCita
                                                                       ,@ServicioTipoID 
                                                                       ,@VehiculoID 
                                                                       ,@UsuarioCreadorID 
                                                                       ,@EstadoID 
                                                                       ,@Combustible 
                                                                       ,@CitaTipoID 
                                                                       ,@UsuarioRecibeID   )
                                                                    
                                                            SELECT @@IDENTITY ";



        public static string updateCita = @"UPDATE [dbo].[Cita]
                                                       SET [ClienteID] = @clienteid
                                                          ,[FechaCita] = @fechacita
                                                          ,[HoraCita] = @HoraCita
                                                          ,[ServicioTipoID] = @ServicioTipoID
                                                          ,[usuarioRecibeID] = @usuarioRecibeID
                                                          ,[VehiculoID] = @VehiculoID 
                                                          ,[CitaTipoID] = @CitaTipoID 
                                                          ,[Observaciones] = @Observaciones 
                                                          ,[Kilometraje] = @Kilometraje 
                                                          ,[AsesorID] = @AsesorID 
                                                          ,[Combustible] = @Combustible 
                                                          ,[TagID] = @TagID 
                                                     WHERE ID = @ID ";




       

        public static string exec_procedure_Validahoralimitecita = @" EXEC Validahoralimitecita @sucursalID , @FechaCita, @horaCita, @tipoCita ";

        public static string getCitaByIDForEdit = @"  select top 1 ci.* from Cita ci 
                                                    where ci.ID = @citaID 
                                                    and
                                                    ci.FechaCita > CONVERT(date,GETDATE())";

    }
}
