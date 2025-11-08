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
    public class SalesController : ControllerBase
    {
        private readonly ISaleService _service;

        public SalesController(ISaleService service)
        {
            _service = service;
        }

        // Создание своей продажи
        [HttpPost]
        public async Task<IActionResult> Create(SaleCreateDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            // Привязка продажи к текущему пользователю
            dto.UserId = userId;

            var result = await _service.CreateAsync(dto, userId);
            return Ok(result);
        }

        // Получение своих продаж
        [HttpGet("my")]
        public async Task<IActionResult> GetMySales()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var result = await _service.GetAllByUserAsync(userId);
            return Ok(result);
        }

        // Получение конкретной своей продажи
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var sale = await _service.GetByIdAsync(id);
            if (sale == null || sale.UserId != userId) return NotFound();

            return Ok(sale);
        }

        // Удаление своей продажи
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var sale = await _service.GetByIdAsync(id);
            if (sale == null || sale.UserId != userId) return NotFound();

            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
