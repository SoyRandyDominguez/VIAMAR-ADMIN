
using System;


namespace ERP.DataAccess.Helpers
{
    public class MUsuarioHelper
    {




        #region CODIGO DE SEGURIDAD

        public static string getCodigoConfirmacionAleatorio()
        {
            return $"M{Guid.NewGuid().ToString().Split('-')[1]}AR";
        }


        #endregion



        public static string InsertOrUpdate = @"
            
if (@UsuarioID = 0)
BEGIN

SELECT @UsuarioID = ISNULL(MAX(UsuarioID),0)+1 FROM MUsuarios 

        INSERT INTO [dbo].[MUsuarios] VALUES
           (@UsuarioID,@UsuNombre ,@UsuApellido,@UsuCedula , @UsuFechaNac ,@UsuUserName ,@UsuClave
           ,convert(datetime,dateadd(year,1,getdate())) ,@UsuActivo ,@usunivel ,@UsuComentario, @email,@TipoUsuarioID,null,null)

        IF(@TipoUsuarioID = 4)
            BEGIN
                INSERT INTO flujo.Caja (TipoCajaID, UsuarioID, BalanceActual, BalanceMinimo, FechaBalance, FechaCreacion,  Disponible, Activa) 
                VALUES (2, @UsuarioID, 0, 1000, GETDATE(), GETDATE(), 1, 1)
                
                INSERT INTO RRiferosUsuarios(RiferoID, UsuarioID) VALUES (@riferoID, @UsuarioID)
            END


END ELSE 

BEGIN

UPDATE [dbo].[MUsuarios] SET TipoUsuarioID= @TipoUsuarioID, email=@email ,[UsuNombre] = @UsuNombre ,[UsuApellido] = @UsuApellido ,[UsuCedula] = @UsuCedula
      ,[UsuFechaNac] =  @UsuFechaNac  ,[UsuUserName] = @UsuUserName ,[UsuClave] = @UsuClave, usunivel= @usunivel
      ,[UsuVenceClave] = convert(datetime,dateadd(year,1,getdate())) ,[UsuActivo] = @UsuActivo ,[UsuComentario] = @UsuComentario
		WHERE UsuarioID = @UsuarioID
        
           IF(@UsuActivo = 1)
            BEGIN
                UPDATE flujo.Caja SET Activa = 1 WHERE UsuarioID = @UsuarioID 
            END

        IF(@TipoUsuarioID = 4)
            BEGIN                
                UPDATE RRiferosUsuarios SET RiferoID = @riferoID WHERE UsuarioID = @UsuarioID 
            END

 END

SELECT top 1 mu.*, ru.RiferoID  FROM MUsuarios mu 
left join RRiferosUsuarios ru ON mu.UsuarioID = ru.UsuarioID
WHERE mu.UsuarioID = @UsuarioID

";

        public static string UpdatePerfil = @"
  
UPDATE [dbo].[MUsuarios] SET email=@email , [UsuNombre] = @UsuNombre ,[UsuApellido] = @UsuApellido ,[UsuCedula] = @UsuCedula
      ,[UsuFechaNac] =  @UsuFechaNac  ,[UsuUserName] = @UsuUserName ,[UsuClave] = @UsuClave
      ,[UsuVenceClave] = convert(datetime,dateadd(year,1,getdate()))  
		WHERE UsuarioID = @UsuarioID
  

";


        public static string setPermisosUsuario = @"
    INSERT INTO [dbo].[RFuncionAdminUsuario] VALUES (@FuncionAdminID ,@UsuarioID)
";


        public static string deletePermisosUsuario = @"
    delete from RFuncionAdminUsuario where UsuarioID = @UsuarioID and FuncionAdminID != 0
";

        public static string deleteRiferosUsuarios = @"
    delete from RRiferosUsuarios where UsuarioID = @UsuarioID
";


        #region Querys

        public static string QueryParaLeerMUsuarios = @" 
SELECT UsuarioID, UsuNombre,UsuUserName,UsuApellido,UsuCedula,UsuClave,
UsuComentario, UsuActivo, UsuNivel, UsuFechaNac, email, Tipo
FROM MUsuarios as mu inner join flujo.TipoUsuario as ft on mu.TipoUsuarioID = ft.TipoUsuarioID WHERE
				
				(@Search = null or 
				UsuUserName like '%'+ @Search+ '%' or 
				UsuNombre like '%'+ @Search + '%' or 
				 UsuApellido like '%'+ @Search + '%'
				) and UsuNivel != 99999
";
        public static string QueryParaLeerMUsuariosFlujo = @" 
             SELECT UsuarioID, UsuNombre,UsuUserName,UsuApellido,UsuCedula,UsuClave,
            UsuComentario, UsuActivo, UsuNivel, UsuFechaNac, email
                FROM MUsuarios WHERE ( UsuUserName like '%'+ @Search+ '%'
                            OR  UsuNombre like '%'+ @Search + '%'
                            OR  UsuApellido like '%'+ @Search + '%' ) and UsuNivel != 99999
";

        public static string getToEdit = @" 
SELECT mu.UsuarioID, UsuNombre,UsuUserName,UsuApellido,UsuCedula,UsuClave,email,TipoUsuarioID,UsuComentario, 
UsuActivo, UsuNivel, CONVERT(VARCHAR(23), UsuFechaNac , 121) UsuFechaNac, ru.RiferoID
FROM MUsuarios mu left join RRiferosUsuarios ru ON mu.UsuarioID = ru.UsuarioID
WHERE mu.UsuarioID = @UsuarioID
";

        public static string getRiferosUsuario = @" 
            Select r.RiferoID,r.RifNombre,ISNULL(ru.UsuarioID,@UsuarioID) as UsuarioID 
            , CASE
                WHEN ru.UsuarioID IS NULL THEN 0
                WHEN ru.UsuarioID IS NOT NULL THEN 1
                ELSE 0
            END AS isChecked
            From MRiferos r 
            LEFT JOIN RRiferosUsuarios ru ON r.Riferoid=ru.RiferoID AND ru.UsuarioID=@UsuarioID
            Where LTRIM(RTRIM(RifNombre))<>'' and  RifActivo=1 order by r.RifNombre ";

        //public static string QueryParaAgregarMUsuarios = @" INSERT INTO [MUsuarios]
        //                                                    ( UsuNombre, UsuUserName, UsuApellido, UsuCedula, UsuClave, UsuComentario,  UsuFechaNac, UsuVenceClave, UsuActivo, UsuNivel)
        //                                                     VALUES (@UsuNombre,@UsuUserName,@UsuApellido,@UsuCedula,@UsuClave,@UsuComentario, CONVERT(Date, getdate()),CONVERT(Date, getdate()), @UsuActivo, @UsuNivel)

        //                                                              SELECT TOP 1 * FROM MUsuarios ORDER BY UsuarioID DESC    

        //                                                                        ";


        //public static string QueryParaActualizarMUsuarios = @" UPDATE [MUsuarios] 
        //                                                            SET UsuNombre = @UsuNombre,
        //                                                            UsuUserName =   @UsuUserName,
        //                                                            UsuApellido =   @UsuApellido,
        //                                                            UsuCedula   =   @UsuCedula,
        //                                                            UsuClave    =   @UsuClave,
        //                                                            UsuComentario = @UsuComentario,
        //                                                            UsuActivo     = @UsuActivo,
        //                                                            UsuNivel        =  @UsuNivel
        //                                                            WHERE UsuarioID = @UsuarioID;

        //                                  select UsuarioID from MUsuarios WHERE UsuarioID = @UsuarioID;

        //                                            ";

        #endregion

        #region OBTENCION DE SIGUIENTE ID

        //public static int GetNextMUusarioID()
        //{
        //    string query = "select UsuarioID = max(UsuarioID) + 1 from MUsuarios";
        //    //string query = $" select top 1 UsuarioID + 1 from MUsuarios order by UsuarioID desc";
        //    try
        //    {
        //        var Resultados = new List<int>();
        //        Resultados = Query<int>(query);
        //        if (Resultados.Any())
        //        {
        //            return Resultados.FirstOrDefault();
        //        }
        //        else
        //        {
        //            return 0;
        //        }

        //    }
        //    catch (Exception)
        //    {
        //        return 0;
        //    }

        //}

        #endregion


        #region Permisos Usuario

        public static string GetPermisosUsuario = @"

declare @TempPermisos table
(
PermisoID int,
PermisoPadreID int,
Nombre varchar(60),
Nivel int
)


;with relation    (childId , parentId, childName, [level], [orderSequence]) 

as  
(  

select id childId , fa.FuncionPadreId parentId, fa.Nombre childName, 0 [level], cast(id as varchar(20))  sequences
from FuncionAdmin fa
where fa.FuncionPadreId is null  
union all  
select p.Id childId, p.FuncionPadreId parentId, p.Nombre childName,  r.[level]+1 [level], cast(r.orderSequence + '_' + cast(p.Id as varchar) as varchar(20))  sequences
from FuncionAdmin p  
inner join relation r on p.FuncionPadreId = r.childId  
)  

insert into @TempPermisos
select childId PermisoID ,parentId PermisoPadreID
,r.childName Nombre
, r.level Nivel
from relation r
order by orderSequence


select tp.PermisoID permisoID, tp.PermisoPadreID permisoPadreID, tp.Nombre nombre, 
(select top 1 TipoUsuarioID from FuncionAdminTipoUsuario where FuncionAdminID = tp.PermisoID ) 
, CASE
    WHEN mu.UsuarioID is not null THEN 1
    WHEN mu.UsuarioID is null THEN 0
END
 isChecked 
 ,CASE
    WHEN (select count(Id) from FuncionAdmin fa where fa.FuncionPadreId = tp.PermisoID) > 0 THEN 1
    WHEN (select count(Id) from FuncionAdmin fa where fa.FuncionPadreId = tp.PermisoID) = 0 THEN 0
END
 hasChild
 , 1 expanded
 
 from RFuncionAdminUsuario r
join MUsuarios mu on mu.UsuarioID = r.UsuarioID and mu.UsuarioID = @UsuarioID
--join RFuncionAdminUsuario r on r.UsuarioID = mu.UsuarioID
right join @TempPermisos tp on PermisoID = r.FuncionAdminID
WHERE PermisoID !=0
 
 ";
        #endregion

        public static string queryEliminar = @"DELETE  FROM RRiferosUsuarios where UsuarioID = @UserID";

        public static string queryAgregar = @"
                                        INSERT INTO RRiferosUsuarios VALUES(@RiferoID, @UserID) ";






        #region FLUJO QUERIES

        public static string flujo_queryInsertarCaja = @"

                                                    INSERT INTO [flujo].[Caja]
                                                               ([TipoCajaID]
                                                               ,[ZonaID]
                                                               ,[CajaDescripcion]
                                                               ,[UsuarioID]
                                                               ,[BancaID]
                                                               ,[Ubicacion]
                                                               ,[BalanceActual]
                                                               ,[BalanceMinimo]
                                                               ,[FechaBalance]
                                                               ,[FechaCreacion]
                                                               ,[Disponible]
                                                               ,[Activa])
                                                         VALUES
                                                               (@TipoCajaID 
                                                               ,@ZonaID 
                                                               ,@CajaDescripcion 
                                                               ,@UsuarioID 
                                                               ,@BancaID 
                                                               ,@Ubicacion 
                                                               ,@BalanceActual 
                                                               ,@BalanceMinimo 
                                                               ,getdate() 
                                                               ,getdate() 
                                                               ,@Disponible 
                                                               ,@Activa)
";






        public static string flujo_queryInsertarOActualizarTarjeta = @"
 if( (select top 1 isnull(t.TarjetaID,0) from flujo.UsuarioTarjetaClaves t where t.UsuarioID= @UsuarioID)> 0)	 
 begin

 UPDATE [flujo].[UsuarioTarjetaClaves]
   SET [UsuarioID] = @UsuarioID
      ,[Serial] = @Serial  
      ,[Comentario] = @Comentario 
      ,[Tokens] = @Tokens 
      ,[Activo] = @Activo 
 WHERE usuarioid= @usuarioid

END
ELSE
BEGIN

 INSERT INTO [flujo].[UsuarioTarjetaClaves]  ([UsuarioID]  ,[Serial] ,[FechaCreacion] ,[Comentario] ,[Tokens] ,[Activo])
  VALUES (@UsuarioID ,year(getdate())*(100000000000000) + ( CAST(ABS(CHECKSUM(NEWID())) % 10000000  AS bigint) * CAST(ABS(CHECKSUM(NEWID())) % 10000000 AS bigint))
           ,getdate() ,@Comentario, @Tokens,1 )

 end ";


        #endregion




    }
}
