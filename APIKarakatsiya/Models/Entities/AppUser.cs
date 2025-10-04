using Microsoft.AspNetCore.Identity;

namespace APIKarakatsiya.Models.Entities
{
    public class AppUser : IdentityUser
    {
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string? VerificationCode { get; set; }

        public ICollection<Item> Items { get; set; } = new List<Item>();
    }
}
