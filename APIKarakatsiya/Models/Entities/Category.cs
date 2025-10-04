﻿namespace APIKarakatsiya.Models.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Item> Items { get; set; } = new List<Item>();
    }
}
