using APIKarakatsiya.Models.DTOs.ItemDto;

namespace APIKarakatsiya.Services.Items
{
    public interface IItemFilterService
    {
        Task<List<ItemDto>> FilterAsync(ItemFilterDto filter, string? userId = null);
    }
}