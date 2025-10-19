using APIKarakatsiya.Models.DTOs.ItemDto;
using APIKarakatsiya.Models.Entities;
using APIKarakatsiya.Services.Items;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;

[ApiController]
[Route("api/[controller]")]
[Authorize] // роли пока не проверяем, только авторизация
public class ItemsController : ControllerBase
{
    private readonly IItemService _service;
    public ItemsController(IItemService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

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
        //var userId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

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

        var created = await _service.CreateAsync(item);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Item item) => Ok(await _service.UpdateAsync(id, item));

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}