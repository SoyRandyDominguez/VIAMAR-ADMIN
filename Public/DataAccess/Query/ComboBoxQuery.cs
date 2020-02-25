using System;
using System.Collections.Generic;
using System.Text;

namespace Public.DataAccess.Query
{
    public class ComboBoxQuery
    {
        public static string selectSucursalesUsuario = @"
                            select s.ID Codigo,s.Nombre , c.Nombre Grupo, c.ID GrupoID from sucursal s
                            inner join UsuarioSucursalEnrroll us on us.SucursalID = s.ID
                            inner join Usuario u on u.ID = us.UsuarioID
                            inner join Compania c on c.id = s.CompaniaID
                            where u.ID = @usuarioID";

        public static string exec_procedure_GethorasDisponibleCita = @" EXEC GethorasDisponibleCita @sucursalID , @FechaCita";
    }
}
