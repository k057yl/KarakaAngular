namespace APIKarakatsiya.Models.DTOs.SaleDto
{
    public class SaleCreateDto
    {
        public int ItemId {  get; set; }
        public decimal SalePrice { get; set; }
        public DateTime SaleDate { get; set; }
        public string? UserId { get; set; }
    }
}
