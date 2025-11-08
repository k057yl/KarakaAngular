namespace APIKarakatsiya.Models.DTOs.SaleDto
{
    public class SaleDto
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public string ItemTitle { get; set; } = string.Empty;
        public string ItemDescription { get; set; } = string.Empty;
        public decimal SalePrice { get; set; }
        public DateTime SaleDate { get; set; }
        public decimal Profit { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<string> PhotoUrls { get; set; } = new();
        public string UserId { get; set; } = null!;
    }
}