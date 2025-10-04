using Microsoft.AspNetCore.Mvc;

namespace APIKarakatsiya.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PingController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() => Ok(new { message = "Бек живой!" });
    }
}
