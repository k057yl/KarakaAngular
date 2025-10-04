using APIKarakatsiya.Models.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace APIKarakatsiya.Data
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Category> Categories => Set<Category>();
        public DbSet<Item> Items => Set<Item>();
        public DbSet<ItemPhoto> ItemPhotos => Set<ItemPhoto>();
        public DbSet<Sale> Sales => Set<Sale>();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Item -> AppUser
            builder.Entity<Item>()
                .HasOne(i => i.User)
                .WithMany(u => u.Items)
                .HasForeignKey(i => i.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Item -> Category
            builder.Entity<Item>()
                .HasOne(i => i.Category)
                .WithMany(c => c.Items)
                .HasForeignKey(i => i.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            // ItemPhoto -> Item
            builder.Entity<ItemPhoto>()
                .HasOne(p => p.Item)
                .WithMany(i => i.Photos)
                .HasForeignKey(p => p.ItemId)
                .OnDelete(DeleteBehavior.Cascade);

            // Sale -> Item
            builder.Entity<Sale>()
                .HasOne(s => s.Item)
                .WithOne(i => i.Sale)
                .HasForeignKey<Sale>(s => s.ItemId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
