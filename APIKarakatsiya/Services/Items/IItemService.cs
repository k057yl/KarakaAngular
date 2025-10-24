using APIKarakatsiya.Models.DTOs.ItemDto;
using APIKarakatsiya.Models.Entities;

namespace APIKarakatsiya.Services.Items
{
    public interface IItemService
    {
        Task<ItemDto> CreateAsync(Item item);
        Task<bool> DeleteAsync(int id);
        Task<List<ItemDto>> GetAllAsync();
        Task<ItemDto?> GetByIdAsync(int id);
        Task<ItemDto> UpdateAsync(int id, Item updated);
        Task<List<ItemDto>> GetAllByUserAsync(string userId);
    }
}
