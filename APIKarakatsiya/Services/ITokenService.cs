using APIKarakatsiya.Models.Entities;

namespace APIKarakatsiya.Services
{
    public interface ITokenService
    {
        string GenerateJwtToken(AppUser user, IList<string> roles);
    }
}
