using APIKarakatsiya.Data;
using APIKarakatsiya.Models.DTOs.ItemDto;
using Microsoft.EntityFrameworkCore;

namespace APIKarakatsiya.Services.Items
{
    public class ItemFilterService : IItemFilterService
    {
        private readonly AppDbContext _context;

        public ItemFilterService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ItemDto>> FilterAsync(ItemFilterDto filter, string? userId = null)
        {
            var query = _context.Items
                .Include(i => i.Photos)
                .AsQueryable();

            if (!string.IsNullOrEmpty(userId))
                query = query.Where(i => i.UserId == userId);

            if (filter.MinPrice.HasValue)
                query = query.Where(i => i.PurchasePrice >= filter.MinPrice.Value);

            if (filter.MaxPrice.HasValue)
                query = query.Where(i => i.PurchasePrice <= filter.MaxPrice.Value);

            if (!string.IsNullOrEmpty(filter.Status))
                query = query.Where(i => i.Status == filter.Status);

            if (!string.IsNullOrEmpty(filter.SortBy))
            {
                query = filter.SortBy.ToLower() switch
                {
                    "price_asc" => query.OrderBy(i => i.PurchasePrice),
                    "price_desc" => query.OrderByDescending(i => i.PurchasePrice),
                    "date_asc" => query.OrderBy(i => i.CreatedAt),
                    "date_desc" => query.OrderByDescending(i => i.CreatedAt),
                    _ => query
                };
            }

            return await query.Select(i => new ItemDto
            {
                Id = i.Id,
                Title = i.Title,
                Description = i.Description,
                PurchasePrice = i.PurchasePrice,
                Status = i.Status,
                CreatedAt = i.CreatedAt,
                PhotoUrls = i.Photos.Select(p => p.Url).ToList()
            }).ToListAsync();
        }
    }
}