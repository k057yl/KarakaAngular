using APIKarakatsiya.Data;
using APIKarakatsiya.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace APIKarakatsiya.Services.Items
{
    public class ItemService : IItemService
    {
        private readonly AppDbContext _context;
        public ItemService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Item> CreateAsync(Item item)
        {
            _context.Items.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return false;
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Item>> GetAllAsync()
        {
            return await _context.Items
                .Include(i => i.Category)
                .Include(i => i.Photos)
                .ToListAsync();
        }

        public async Task<Item?> GetByIdAsync(int id)
        {
            return await _context.Items
                .Include (i => i.Category)
                .Include (i => i.Photos)
                .FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Item> UpdateAsync(int id, Item updated)
        {
            var existing = await _context.Items.FindAsync(id);
            if (existing == null)
            {
                throw new KeyNotFoundException("Item not found");
            }

            existing.Title = updated.Title;
            existing.Description = updated.Description;
            existing.PurchasePrice = updated.PurchasePrice;
            existing.PurchaseDate = updated.PurchaseDate;
            existing.Status = updated.Status;
            existing.UpdatedAt = updated.UpdatedAt;

            await _context.SaveChangesAsync();
            return existing;
        }
    }
}
