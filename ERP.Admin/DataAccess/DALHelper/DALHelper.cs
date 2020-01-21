using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.DataAccess.DALHelper
{
    public class DALHelper
    {
        public static class ConfigReader
        {
            public static string ReadString(ERP.Config.ConfigEnums pConfigId)
            {
                return ERP.AppLogic.Encryption.Encryptor.DecryptConfig(ERP.Config.Reader.ReadString(pConfigId));
            }
        }
        public static System.Data.SqlClient.SqlConnection GetSqlConnection()
        {
            return new System.Data.SqlClient.SqlConnection(ConfigReader.ReadString(ERP.Config.ConfigEnums.DBConnection2));
        }


    }
}
