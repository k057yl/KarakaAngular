namespace APIKarakatsiya.Models.DTOs.SaleDto
{
    public class SaleFilterDto
    {
        public string? UserId { get; set; }
        public decimal? MinProfit { get; set; }
        public decimal? MaxProfit { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? SortBy { get; set; }
    }
}
