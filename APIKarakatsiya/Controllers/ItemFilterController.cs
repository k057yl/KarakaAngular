using APIKarakatsiya.Models.DTOs.ItemDto;
using APIKarakatsiya.Services.Items;
using Microsoft.AspNetCore.Mvc;

namespace APIKarakatsiya.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemFilterController : ControllerBase
    {
        private readonly IItemFilterService _filterService;

        public ItemFilterController(IItemFilterService filterService)
        {
            _filterService = filterService;
        }

        [HttpGet]
        public async Task<IActionResult> GetFilteredItems([FromQuery] ItemFilterDto filter)
        {
            try
            {
                var items = await _filterService.FilterAsync(filter);
                return Ok(items);
            }
            catch (Exception ex)
            {
                Console.WriteLine("=== FILTER CONTROLLER ERROR ===");
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}