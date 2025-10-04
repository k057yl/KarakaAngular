namespace APIKarakatsiya.Models.Entities
{
    public class ItemPhoto
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public Item Item { get; set; } = null!;

        public string Url { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
