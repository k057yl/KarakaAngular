using APIKarakatsiya.Models.DTOs.ItemDto;
using APIKarakatsiya.Models.DTOs.SaleDto;

namespace APIKarakatsiya.Services.Items
{
    public interface IItemFilterService
    {
        Task<List<SaleDto>> FilterAsync(ItemFilterDto filter);
    }
}