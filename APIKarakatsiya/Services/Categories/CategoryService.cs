using APIKarakatsiya.Data;
using APIKarakatsiya.Models.DTOs.CategoryDto;
using APIKarakatsiya.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace APIKarakatsiya.Services.Categories
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _context;

        public CategoryService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<CategoryDto>> GetAllAsync()
        {
            return await _context.Categories
                .Select(c => new CategoryDto
                {
                    Id = c.Id,
                    NameEn = c.NameEn,
                    NameUk = c.NameUk
                })
                .ToListAsync();
        }

        public async Task<CategoryDto> CreateAsync(CategoryCreateDto dto)
        {
            var category = new Category
            {
                NameEn = dto.NameEn,
                NameUk = dto.NameUk
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return new CategoryDto
            {
                Id = category.Id,
                NameEn = category.NameEn,
                NameUk = category.NameUk
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return false;

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
