using APIKarakatsiya.Models.DTOs;
using Microsoft.AspNetCore.Identity;

namespace APIKarakatsiya.Services
{
    public interface IAuthService
    {
        Task<IdentityResult> RegisterAsync(RegisterRequestDto dto);
        Task<bool> ConfirmEmailAsync(ConfirmEmailRequestDto dto);
        Task<string?> LoginAsync(LoginDto dto);
        Task ForgotPasswordAsync(ForgotPasswordDto dto);
        Task<IdentityResult?> ResetPasswordAsync(ResetPasswordDto dto);
        Task LogoutAsync(string userId);
    }
}
