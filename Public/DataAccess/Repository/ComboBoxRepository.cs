using Public.DataAccess.Models;
using Public.DataAccess.Query;
using Public.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Public.DataAccess.Repository
{
    public class ComboBoxRepository : BaseRepository
    {

        public static List<ComboBox> GetSucursalesUsuario(int usuarioID)
        {
            var resultados = Query<ComboBox>(ComboBoxQuery.selectSucursalesUsuario, new { usuarioID });
            return resultados;
        }


    }
}
