using APIKarakatsiya.Models.DTOs.SaleDto;

namespace APIKarakatsiya.Services.Sales
{
    public interface ISaleService
    {
        Task<SaleDto> CreateAsync(SaleCreateDto dto, string userId);
        Task<SaleDto?> GetByIdAsync(int id);
        Task DeleteAsync(int id);
        Task<IEnumerable<SaleDto>> GetAllByUserAsync(string userId);
    }
}
