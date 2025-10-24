using APIKarakatsiya.Models.DTOs.ItemDto;
using APIKarakatsiya.Models.Entities;
using APIKarakatsiya.Services.Items;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
[Authorize] // роли пока не проверяем, только авторизация
public class ItemsController : ControllerBase
{
    private readonly IItemService _service;
    public ItemsController(IItemService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _service.GetAllAsync();
        return Ok(items);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _service.GetByIdAsync(id);
        return item == null ? NotFound() : Ok(item);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateItem([FromBody] ItemCreateDto dto)
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var item = new Item
        {
            Title = dto.Title,
            Description = dto.Description,
            PurchasePrice = dto.PurchasePrice,
            PurchaseDate = dto.PurchaseDate,
            CategoryId = dto.CategoryId,
            UserId = userId,
            Status = "available"
        };

        if (!string.IsNullOrEmpty(dto.PhotoUrl))
        {
            item.Photos.Add(new ItemPhoto { Url = dto.PhotoUrl, CreatedAt = DateTime.UtcNow });
        }

        var createdDto = await _service.CreateAsync(item);
        return CreatedAtAction(nameof(GetById), new { id = createdDto.Id }, createdDto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Item item) => Ok(await _service.UpdateAsync(id, item));

    [HttpGet("my")]
    public async Task<ActionResult<IEnumerable<ItemDto>>> GetMyItems()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return Unauthorized();

        var items = await _service.GetAllByUserAsync(userId);
        return Ok(items);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}