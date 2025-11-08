namespace APIKarakatsiya.Models.DTOs.ItemDto
{
    public class ItemFilterDto
    {
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? SortBy { get; set; }

        // Для фильтрации айтемов
        public string? Title { get; set; }
        public string? Category { get; set; }
        public bool? OnlyAvailable { get; set; }
        public string? Status { get; set; }
    }
}
