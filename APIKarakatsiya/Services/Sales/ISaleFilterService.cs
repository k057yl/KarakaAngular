using APIKarakatsiya.Models.DTOs.SaleDto;

namespace APIKarakatsiya.Services.Sales
{
    public interface ISaleFilterService
    {
        Task<List<SaleDto>> FilterAsync(SaleFilterDto filter);
    }
}
