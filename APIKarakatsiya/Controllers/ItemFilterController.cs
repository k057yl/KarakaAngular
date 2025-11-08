using APIKarakatsiya.Models.DTOs.ItemDto;
using APIKarakatsiya.Services.Items;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace APIKarakatsiya.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemFilterController : ControllerBase
    {
        private readonly IItemFilterService _itemFilterService;

        public ItemFilterController(IItemFilterService itemFilterService)
        {
            _itemFilterService = itemFilterService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetFilteredItems([FromQuery] ItemFilterDto filter)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var items = await _itemFilterService.FilterAsync(filter, userId);
            return Ok(items);
        }
    }
}