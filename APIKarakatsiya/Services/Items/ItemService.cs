using APIKarakatsiya.Data;
using APIKarakatsiya.Models.DTOs.ItemDto;
using APIKarakatsiya.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace APIKarakatsiya.Services.Items
{
    public class ItemService : IItemService
    {
        private readonly AppDbContext _context;
        public ItemService(AppDbContext context) => _context = context;

        public async Task<ItemDto> CreateAsync(Item item)
        {
            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return new ItemDto
            {
                Id = item.Id,
                Title = item.Title,
                Description = item.Description,
                PurchasePrice = item.PurchasePrice,
                PhotoUrls = item.Photos.Select(p => p.Url).ToList(),
                Status = item.Status.ToLower()
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null) return false;

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<ItemDto>> GetAllAsync()
        {
            var items = await _context.Items
                .Include(i => i.Photos)
                .ToListAsync();

            return items.Select(i => new ItemDto
            {
                Id = i.Id,
                Title = i.Title,
                Description = i.Description,
                PurchasePrice = i.PurchasePrice,
                PhotoUrls = i.Photos.Select(p => p.Url).ToList(),
                Status = i.Status.ToLower()
            }).ToList();
        }

        public async Task<ItemDto?> GetByIdAsync(int id)
        {
            var item = await _context.Items
                .Include(i => i.Photos)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (item == null) return null;

            return new ItemDto
            {
                Id = item.Id,
                Title = item.Title,
                Description = item.Description,
                PurchasePrice = item.PurchasePrice,
                PhotoUrls = item.Photos.Select(p => p.Url).ToList()
            };
        }

        public async Task<ItemDto> UpdateAsync(int id, Item updated)
        {
            var existing = await _context.Items.FindAsync(id);
            if (existing == null) throw new KeyNotFoundException("Item not found");

            existing.Title = updated.Title;
            existing.Description = updated.Description;
            existing.PurchasePrice = updated.PurchasePrice;
            existing.PurchaseDate = updated.PurchaseDate;
            existing.Status = updated.Status;
            existing.UpdatedAt = updated.UpdatedAt;

            await _context.SaveChangesAsync();

            return new ItemDto
            {
                Id = existing.Id,
                Title = existing.Title,
                Description = existing.Description,
                PurchasePrice = existing.PurchasePrice,
                PhotoUrls = existing.Photos.Select(p => p.Url).ToList(),
                Status = existing.Status.ToLower()
            };
        }

        public async Task<List<ItemDto>> GetAllByUserAsync(string userId)
        {
            var items = await _context.Items
                .Include(i => i.Photos)
                .Where(i => i.UserId == userId)
                .ToListAsync();

            return items.Select(i => new ItemDto
            {
                Id = i.Id,
                Title = i.Title,
                Description = i.Description,
                PurchasePrice = i.PurchasePrice,
                PhotoUrls = i.Photos.Select(p => p.Url).ToList(),
                Status = i.Status.ToLower()
            }).ToList();
        }
    }
}
