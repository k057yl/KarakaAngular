namespace APIKarakatsiya.Models.Entities
{
    public class Item
    {
        public int Id { get; set; }

        public string UserId { get; set; } = null!;
        public AppUser User { get; set; } = null!;

        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;

        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public decimal PurchasePrice { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string Status { get; set; } = "available";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<ItemPhoto> Photos { get; set; } = new List<ItemPhoto>();
        public Sale? Sale { get; set; }
    }
}
