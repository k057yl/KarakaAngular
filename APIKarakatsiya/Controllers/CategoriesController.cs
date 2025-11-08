using APIKarakatsiya.Models.DTOs.CategoryDto;
using APIKarakatsiya.Services.Categories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace APIKarakatsiya.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoriesController(ICategoryService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _service.GetAllAsync();
            return Ok(categories);
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Create([FromBody] CategoryCreateDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.NameEn) || string.IsNullOrWhiteSpace(dto.NameUk))
                return BadRequest("Both NameEn and NameUk are required.");

            var category = await _service.CreateAsync(dto);
            return Ok(category);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            if (!success) return NotFound();

            return NoContent();
        }
    }
}
