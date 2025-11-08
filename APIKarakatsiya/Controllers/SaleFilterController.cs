using APIKarakatsiya.Models.DTOs.SaleDto;
using APIKarakatsiya.Services.Sales;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace APIKarakatsiya.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SaleFilterController : ControllerBase
    {
        private readonly ISaleFilterService _saleFilterService;

        public SaleFilterController(ISaleFilterService saleFilterService)
        {
            _saleFilterService = saleFilterService;
        }

        [HttpGet]
        public async Task<IActionResult> GetFilteredSales([FromQuery] SaleFilterDto filter)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null) return Unauthorized();

                filter.UserId = userId;

                var sales = await _saleFilterService.FilterAsync(filter);
                return Ok(sales);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[SaleFilterController] Ошибка: {ex.Message}");
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}
