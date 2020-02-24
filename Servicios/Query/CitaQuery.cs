using System;
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


    }
}
