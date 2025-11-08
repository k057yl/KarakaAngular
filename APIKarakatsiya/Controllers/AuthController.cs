using APIKarakatsiya.Models.DTOs;
using APIKarakatsiya.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace APIKarakatsiya.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto dto)
        {
            var result = await _authService.RegisterAsync(dto);
            if (!result.Succeeded) return BadRequest(result.Errors);
            return Ok(new { message = "Код отправлен на почту" });
        }

        [HttpPost("confirm-email")]
        public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailRequestDto dto)
        {
            var success = await _authService.ConfirmEmailAsync(dto);
            if (!success) return BadRequest("Неверный код или пользователь не найден");
            return Ok(new { message = "Email подтвержден" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var token = await _authService.LoginAsync(dto);
            if (token == null) return Unauthorized("Неверные данные");
            if (token == "unconfirmed") return Unauthorized("Email не подтвержден");

            return Ok(new { token });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto dto)
        {
            await _authService.ForgotPasswordAsync(dto);
            return Ok(new { message = "Письмо отправлено" });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
        {
            var result = await _authService.ResetPasswordAsync(dto);
            if (result == null) return BadRequest("Пользователь не найден");
            if (!result.Succeeded) return BadRequest(result.Errors);

            return Ok(new { message = "Пароль изменен" });
        }

        [HttpPost("logout/{userId}")]
        public async Task<IActionResult> Logout(string userId)
        {
            await _authService.LogoutAsync(userId);
            return Ok(new { message = "Вы вышли" });
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            var email = User.Identity?.Name;
            var roles = User.Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value)
                .ToList();

            return Ok(new { email, roles });
        }
    }
}