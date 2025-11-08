using APIKarakatsiya.Models.DTOs.CategoryDto;
using APIKarakatsiya.Models.Entities;

namespace APIKarakatsiya.Services.Categories
{
    public interface ICategoryService
    {
        Task<List<CategoryDto>> GetAllAsync();
        Task<CategoryDto> CreateAsync(CategoryCreateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
