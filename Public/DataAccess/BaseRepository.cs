using Dapper;
using Microsoft.SqlServer.Server;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Public.DataAccess.Models;


namespace Public.DataAccess
{
    public abstract class BaseRepository
    {
        static SqlConnection _cn = null;


        protected static T ExecuteScalar<T>(string sentencia, object parametros = null)
        {
            OpenConnection();
            if (sentencia == null) return default(T);
            var paramList = new DynamicParameters();
            if (parametros != null) paramList.AddDynamicParams(parametros);
            return (_cn.ExecuteScalar<T>(sentencia, paramList));
        }

        protected static void ExecuteScalarList(string sentencia, List<object> parametros = null)
        {
            OpenConnection();

            //var paramList = new DynamicParameters();
            //if (parametros != null) paramList.AddDynamicParams(parametros);
            _cn.Execute(sentencia, parametros);
        }



        protected static List<T> Query<T>(string sentencia, object parametros = null)
        {
            OpenConnection();
            if (sentencia == null) return default(List<T>);
            var paramList = new DynamicParameters();
            if (parametros != null) paramList.AddDynamicParams(parametros);
            return (_cn.Query<T>(sentencia, paramList)).ToList();
        }

        protected static List<T> QueryAsync<T>(string sentencia, object parametros = null)
        {
            OpenConnection();
            if (sentencia == null) return default(List<T>);
            var paramList = new DynamicParameters();
            if (parametros != null) paramList.AddDynamicParams(parametros);
            return (_cn.QueryAsync<T>(sentencia, paramList)).Result.ToList();
        }

        protected static List<T> QueryStoredProcedure<T>(string StoredPName, object parametros = null)
        {
            OpenConnection();
            if (StoredPName == null) return default(List<T>);
            var paramList = new DynamicParameters();
            if (parametros != null) paramList.AddDynamicParams(parametros);
            return (_cn.Query<T>(StoredPName, paramList, commandType: CommandType.StoredProcedure)).ToList();

        }

        protected static ListadoRecords<T> QueryConPaginacion<T>(string sentencia, object parametros = null, Paginacion pagina = null) where T : BaseDataRecord
        {
            try
            {
                OpenConnection();
                if (sentencia == null) return null;
                var sentenciaFinal = sentencia;
                sentencia = Regex.Replace(sentencia, @"^\s+$[\r\n]*", "", RegexOptions.Multiline).Trim().ToUpper().Replace(";", ""); //Eliminar lineas en blanco
                var results = new ListadoRecords<T>();

                var combinedParams = new DynamicParameters();
                if (parametros != null)
                {
                    combinedParams.AddDynamicParams(parametros);
                }
                if (pagina != null && pagina.PaginaSize > 0 && pagina.PaginaNo > 0 && pagina.OrdenColumna != null
                    && pagina.OrdenColumna.Trim().Length > 0)
                {
                    pagina.OrdenColumna = Regex.Replace(pagina.OrdenColumna, @"^\s+$[\r\n]*", "", RegexOptions.Multiline)
                                                        .Trim().Replace("--", "").Replace(";", "")
                                                        .Replace("'", ""); // Eliminar lineas y caracteres peligrosos
                    combinedParams.AddDynamicParams(pagina);
                    var sentenciaRowNumber = string.Format(@"SELECT ROW_NUMBER() OVER ( ORDER BY [{1}] {2}) AS RecordNo,{0}",
                                                           sentencia.Substring(6), pagina.OrdenColumna, pagina.OrdenAsc ? "ASC" : "DESC");
                    sentenciaFinal = string.Format(@"
                                SELECT @TotalRecords = COUNT(*)
                                {0};

                                SET @TotalPaginas = CEILING(CAST(@TotalRecords as float)/@PaginaSize);
                                SET @PaginaNo = CASE WHEN @PaginaNo<=@TotalPaginas THEN @PaginaNo ELSE @TotalPaginas END;
                                DECLARE @RecordFrom int = 1 + ((@PaginaNo-1) * @PaginaSize);
                                DECLARE @RecordTo int = @RecordFrom + (@PaginaSize-1);

                                SELECT  *
                                FROM    (
		                                  {1} {4}
                                        ) AS PaginacionQuery
                                WHERE   RecordNo >= @RecordFrom
                                    AND RecordNo <= @RecordTo

                               
                                ORDER BY RecordNo;


                                SELECT @PaginaSize PaginaSize,
	                                   @PaginaNo PaginaNo,
	                                   @TotalPaginas TotalPaginas,
	                                   @@ROWCOUNT PaginaRecords,
	                                   @TotalRecords TotalRecords,
	                                   '{2}' OrdenColumna,
	                                   CAST({3} as bit) OrdenAsc;                        
                    ",
                        sentencia.Substring(sentencia.ToUpper().IndexOf("FROM ")),
                        sentenciaRowNumber,
                        pagina.OrdenColumna,
                        pagina.OrdenAsc ? "1" : "0", pagina.filtro);

                }

                var gReader = _cn.QueryMultiple(sentenciaFinal, combinedParams);
                results.Records = gReader.Read<T>().ToList();
                if (!gReader.IsConsumed)
                {
                    results.Pagina = gReader.Read<Paginacion>().FirstOrDefault();
                }
                return results;
            }
            catch (Exception e)
            {
                string error = e.Message;
                throw;
            }
        }

        protected static List<dynamic> Query(string sentencia, object parametros = null)
        {
            OpenConnection();
            if (sentencia == null) return default(List<dynamic>);
            var paramList = new DynamicParameters();
            if (parametros != null) paramList.AddDynamicParams(parametros);
            return (_cn.Query(sentencia, paramList)).ToList();
        }

        protected static void CrealLogEntry(string pLogTipo, string pLogComentario, string pUsuarioID, string pSecRemoteIP, int pBancaID)
        {

            //ExecuteScalar<int>(@"
            //        INSERT INTO Log (UsuarioSesionId,Fecha,Tipo,Descripcion, DireccionIp)
            //        VALUES (@SesionId,GETDATE(),@Tipo,@Descripcion, @Ip);
            //        SELECT @@ROWCOUNT;
            //   ", new { SesionId = sesion, Tipo = tipo, Descripcion = descripcion, Ip = direccionIp });



            QueryStoredProcedure<object>("Hac_Hacienda_Guardar_Log", new { LogTipo = pLogTipo, LogComentario = pLogComentario, UsuarioID = pUsuarioID, SecRemoteIP = pSecRemoteIP, BancaID = pBancaID });
        }

        static void OpenConnection()
        {
            if (_cn != null)
            {
                if (_cn.State == System.Data.ConnectionState.Open)
                {
                    return;
                }
                else
                {
                    _cn.Close();
                    _cn.Dispose();
                    _cn = null;
                }
            }

            _cn = DALHelper.DALHelper.GetSqlConnection();// new SqlConnection(@"data source=(local);initial catalog=MARCentral;persist security info=True;MultipleActiveResultSets=true;Min Pool Size=10;user id=sa;pwd=st0rpk0qt0z");
            try
            {
                _cn.Open();
            }
            catch (Exception ex)
            {
                throw new Exception("Fallo la conexion a la base de datos.", ex);
            }
        }

        protected static SqlDataRecord toDobleIdSqlDataRecord(int? Id1, int? Id2)
        {
            var result = new SqlDataRecord(new SqlMetaData[] {
                new SqlMetaData("Id1", SqlDbType.Int),
                new SqlMetaData("Id2", SqlDbType.Int),
            });

            if (Id1.HasValue)
                result.SetInt32(0, Id1.Value);
            else
                result.SetDBNull(0);


            if (Id2.HasValue)
                result.SetInt32(1, Id2.Value);
            else
                result.SetDBNull(1);

            return result;
        }

    }
}
