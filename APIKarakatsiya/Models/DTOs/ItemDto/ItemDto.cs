namespace APIKarakatsiya.Models.DTOs.ItemDto
{
    public class ItemDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public decimal PurchasePrice { get; set; }
        public List<string> PhotoUrls { get; set; } = new();
        public string Status { get; set; } = "available";
        public DateTime CreatedAt { get; set; }
    }
}
