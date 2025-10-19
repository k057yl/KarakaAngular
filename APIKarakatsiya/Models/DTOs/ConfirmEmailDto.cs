namespace APIKarakatsiya.Models.DTOs
{
    public class ConfirmEmailDto
    {
        public string UserId { get; set; } = null!;
        public string Code { get; set; } = null!;
    }
}
