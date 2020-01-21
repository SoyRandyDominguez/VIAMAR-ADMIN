using ERP.Models.DataRecord;
using Microsoft.AspNetCore.Mvc;
using ERP.DataAccess;

namespace ERP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAuthDataController : BaseController<AuthUserRecord>
    {
        [HttpPost]
        [Route("GetUserAuth")]
        public ResponseContenido GetUserAuth(RequestContenido rq)
        {
            return AuthUserRepositorio.GetUserAuth(rq);
        }


    }
}
