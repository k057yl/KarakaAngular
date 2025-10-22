namespace APIKarakatsiya.Models.DTOs.ItemDto
{
    public class ItemResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public decimal PurchasePrice { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string Status { get; set; } = "available";
        public int CategoryId { get; set; }
        public string UserId { get; set; } = null!;
        public List<ItemPhotoDto> Photos { get; set; } = new();
    }
}
