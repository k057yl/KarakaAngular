using APIKarakatsiya.Data;
using APIKarakatsiya.Models.DTOs.ItemDto;
using APIKarakatsiya.Models.DTOs.SaleDto;
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

        // Теперь фильтруем по таблице Sales, а не по Items
        public async Task<List<SaleDto>> FilterAsync(ItemFilterDto filter)
        {
            try
            {
                var query = _context.Sales
                    .Include(s => s.Item)
                        .ThenInclude(i => i.Photos)
                    .AsQueryable();

                if (filter.MinPrice.HasValue)
                    query = query.Where(s => s.SalePrice >= filter.MinPrice.Value);

                if (filter.MaxPrice.HasValue)
                    query = query.Where(s => s.SalePrice <= filter.MaxPrice.Value);

                if (filter.StartDate.HasValue)
                    query = query.Where(s => s.SaleDate >= filter.StartDate.Value);

                if (filter.EndDate.HasValue)
                    query = query.Where(s => s.SaleDate <= filter.EndDate.Value);

                if (!string.IsNullOrEmpty(filter.SortBy))
                {
                    query = filter.SortBy.ToLower() switch
                    {
                        "price_asc" => query.OrderBy(s => s.SalePrice),
                        "price_desc" => query.OrderByDescending(s => s.SalePrice),
                        "date_asc" => query.OrderBy(s => s.SaleDate),
                        "date_desc" => query.OrderByDescending(s => s.SaleDate),
                        _ => query
                    };
                }

                return await query
                    .Select(s => new SaleDto
                    {
                        Id = s.Id,
                        ItemId = s.Item.Id,
                        ItemTitle = s.Item.Title,
                        SalePrice = s.SalePrice,
                        Profit = s.Profit,
                        SaleDate = s.SaleDate,
                        CreatedAt = s.CreatedAt,
                        PhotoUrls = s.Item.Photos.Select(p => p.Url).ToList()
                    })
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ItemFilterService] Ошибка: {ex.Message}");
                Console.WriteLine(ex.StackTrace);
                throw;
            }
        }
    }
}