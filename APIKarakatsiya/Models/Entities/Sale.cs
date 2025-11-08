namespace APIKarakatsiya.Models.Entities
{
    public class Sale
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public Item Item { get; set; } = null!;
        public decimal SalePrice { get; set; }
        public DateTime SaleDate { get; set; }
        public decimal Profit { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string? UserId { get; set; } = null;
    }
}
