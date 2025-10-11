namespace APIKarakatsiya.Models.DTOs.ItemDto
{
    public class ItemCreateDto
    {
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public decimal PurchasePrice { get; set; }
        public DateTime PurchaseDate { get; set; }
        public int CategoryId { get; set; }
        public string UserId { get; set; } = null!;
    }
}
