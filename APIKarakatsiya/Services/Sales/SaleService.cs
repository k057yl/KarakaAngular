using APIKarakatsiya.Data;
using APIKarakatsiya.Models.DTOs.SaleDto;
using APIKarakatsiya.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace APIKarakatsiya.Services.Sales
{
    public class SaleService : ISaleService
    {
        private readonly AppDbContext _context;

        public SaleService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<SaleDto> CreateAsync(SaleCreateDto dto, string userId)
        {
            var item = await _context.Items.FirstOrDefaultAsync(i => i.Id == dto.ItemId)
                ?? throw new Exception("Item not found");

            if (item.Status == "sold")
                throw new Exception("Item уже продан");

            var sale = new Sale
            {
                ItemId = dto.ItemId,
                SalePrice = dto.SalePrice,
                SaleDate = dto.SaleDate,
                Profit = dto.SalePrice - item.PurchasePrice,
                UserId = userId
            };

            _context.Sales.Add(sale);

            item.Status = "sold";
            item.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return new SaleDto
            {
                Id = sale.Id,
                ItemId = sale.ItemId,
                ItemTitle = item.Title,
                SalePrice = sale.SalePrice,
                SaleDate = sale.SaleDate,
                Profit = sale.Profit,
                CreatedAt = sale.CreatedAt,
                PhotoUrls = item.Photos.Select(p => p.Url).ToList(),
                UserId = sale.UserId
            };
        }

        public async Task<IEnumerable<SaleDto>> GetAllByUserAsync(string userId)
        {
            return await _context.Sales
                .Include(s => s.Item)
                .Where(s => s.Item.UserId == userId)
                .Select(s => new SaleDto
                {
                    Id = s.Id,
                    ItemId = s.Item.Id,
                    ItemTitle = s.Item.Title,
                    SalePrice = s.SalePrice,
                    SaleDate = s.SaleDate,
                    Profit = s.Profit,
                    CreatedAt = s.CreatedAt,
                    PhotoUrls = s.Item.Photos.Select(p => p.Url).ToList()
                })
                .ToListAsync();
        }

        public async Task<SaleDto?> GetByIdAsync(int id)
        {
            var sale = await _context.Sales
                .Include(s => s.Item)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (sale == null) return null;

            return new SaleDto
            {
                Id = sale.Id,
                ItemId = sale.Item.Id,
                ItemTitle = sale.Item.Title,
                SalePrice = sale.SalePrice,
                SaleDate = sale.SaleDate,
                Profit = sale.Profit,
                CreatedAt = sale.CreatedAt,
                PhotoUrls = sale.Item.Photos.Select(p => p.Url).ToList()
            };
        }

        public async Task DeleteAsync(int id)
        {
            var sale = await _context.Sales.FindAsync(id)
                ?? throw new Exception("Sale not found");

            _context.Sales.Remove(sale);
            await _context.SaveChangesAsync();
        }
    }
}