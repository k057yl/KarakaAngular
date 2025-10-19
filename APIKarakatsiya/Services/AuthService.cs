using APIKarakatsiya.Models.DTOs;
using APIKarakatsiya.Models.Entities;
using Microsoft.AspNetCore.Identity;

namespace APIKarakatsiya.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly EmailService _emailService;
        private readonly IConfiguration _config;

        public AuthService(UserManager<AppUser> userManager, ITokenService tokenService, EmailService emailService, IConfiguration config)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _emailService = emailService;
            _config = config;
        }

        public async Task<IdentityResult> RegisterAsync(RegisterRequestDto dto)
        {
            var user = new AppUser
            {
                UserName = dto.Username,
                Email = dto.Email,
                EmailConfirmed = false
            };

            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded) return result;

            var code = new Random().Next(100000, 999999).ToString();
            user.VerificationCode = code;
            await _userManager.UpdateAsync(user);

            var html = $"<p>Ваш код подтверждения: <b>{code}</b></p>";
            await _emailService.SendEmailAsync(user.Email!, "Подтверждение регистрации", html);

            return result;
        }

        public async Task<bool> ConfirmEmailAsync(ConfirmEmailRequestDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null) return false;

            if (user.VerificationCode != dto.Code) return false;

            user.EmailConfirmed = true;
            user.VerificationCode = null;
            await _userManager.UpdateAsync(user);

            return true;
        }

        public async Task<string?> LoginAsync(LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null) return null;

            var valid = await _userManager.CheckPasswordAsync(user, dto.Password);
            if (!valid) return null;

            if (!user.EmailConfirmed) return "unconfirmed";

            var roles = await _userManager.GetRolesAsync(user);
            return _tokenService.GenerateJwtToken(user, roles);
        }

        public async Task ForgotPasswordAsync(ForgotPasswordDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null) return;

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var urlToken = Uri.EscapeDataString(token);

            var resetUrl = $"{_config["Frontend:Url"]}/reset-password?email={dto.Email}&token={urlToken}";
            var html = $"<p>Чтобы сбросить пароль, перейди по ссылке: <a href=\"{resetUrl}\">Сбросить пароль</a></p>";

            await _emailService.SendEmailAsync(dto.Email, "Сброс пароля", html);
        }

        public async Task<IdentityResult?> ResetPasswordAsync(ResetPasswordDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null) return null;

            return await _userManager.ResetPasswordAsync(user, dto.Token, dto.NewPassword);
        }

        public async Task LogoutAsync(string userId)
        {
            await Task.CompletedTask;
        }
    }
}