using APIKarakatsiya.Data;
using APIKarakatsiya.Models.DTOs.SaleDto;
using Microsoft.EntityFrameworkCore;

namespace APIKarakatsiya.Services.Sales
{
    public class SaleFilterService : ISaleFilterService
    {
        private readonly AppDbContext _context;

        public SaleFilterService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<SaleDto>> FilterAsync(SaleFilterDto filter)
        {
            var query = _context.Sales
                .Include(s => s.Item)
                    .ThenInclude(i => i.Photos)
                .AsQueryable();

            // если передан userId и пользователь не admin, фильтруем
            if (!string.IsNullOrEmpty(filter.UserId))
            {
                query = query.Where(s => s.UserId == filter.UserId);
            }

            if (filter.MinProfit.HasValue)
                query = query.Where(s => s.Profit >= filter.MinProfit.Value);

            if (filter.MaxProfit.HasValue)
                query = query.Where(s => s.Profit <= filter.MaxProfit.Value);

            if (filter.StartDate.HasValue)
                query = query.Where(s => s.SaleDate >= filter.StartDate.Value);

            if (filter.EndDate.HasValue)
                query = query.Where(s => s.SaleDate <= filter.EndDate.Value);

            if (!string.IsNullOrEmpty(filter.SortBy))
            {
                query = filter.SortBy.ToLower() switch
                {
                    "profit_asc" => query.OrderBy(s => s.Profit),
                    "profit_desc" => query.OrderByDescending(s => s.Profit),
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
                    PhotoUrls = s.Item.Photos.Select(p => p.Url).ToList(),
                    UserId = s.UserId
                })
                .ToListAsync();
        }
    }
}
