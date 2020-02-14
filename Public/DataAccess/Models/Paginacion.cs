namespace Public.DataAccess.Models
{
    public class Paginacion
    {
        public int PaginaNo { get; set; }
        public int PaginaSize { get; set; }
        public int PaginaRecords { get; set; }
        public int TotalPaginas { get; set; }
        public int TotalRecords { get; set; }
        public bool OrdenAsc { get; set; }
        public string OrdenColumna { get; set; }
        public string filtro { get; set; }
    }
}