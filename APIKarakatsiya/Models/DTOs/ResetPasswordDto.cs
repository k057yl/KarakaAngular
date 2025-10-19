namespace APIKarakatsiya.Models.DTOs
{
    public record ResetPasswordDto(string Email, string Token, string NewPassword);
}