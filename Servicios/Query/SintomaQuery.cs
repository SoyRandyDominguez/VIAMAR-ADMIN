using System;
using System.Collections.Generic;
using System.Text;

namespace Servicios.Query
{
    public static class SintomaQuerys
    {

        public static string insertCitaSintomaEnrroll = @"INSERT INTO [dbo].[CitaSintomaEnrroll]
                                                                                         ([CitaID]
                                                                                         ,[Descripcion]
                                                                                         ,[SintomaID])
                                                                                        VALUES
                                                                                         (@CitaID 
                                                                                         ,@Descripcion 
                                                                                         ,@SintomaID ) ";


        public static string deleteAllSintomasByCitaID = @"delete from CitaSintomaEnrroll where CitaID = @ID";



        public static string selectAllSintomasByCitaID = @" select c.CitaID, s.ID SintomaID, s.Nombre,c.Descripcion  from Sintoma s
                                                                                    inner join CitaSintomaEnrroll c on c.SintomaID = s.ID
                                                                                    where c.CitaID = @CitaID ";


    }
}
