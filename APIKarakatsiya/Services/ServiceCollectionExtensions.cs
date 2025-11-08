using APIKarakatsiya.Data;
using APIKarakatsiya.Models.Entities;
using APIKarakatsiya.Services.Categories;
using APIKarakatsiya.Services.Items;
using APIKarakatsiya.Services.Sales;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace APIKarakatsiya.Services
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services, IConfiguration config)
        {
            // DB + Identity
            services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(config.GetConnectionString("DefaultConnection")));

            services.AddIdentity<AppUser, IdentityRole>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();

            // JWT
            var jwt = config.GetSection("Jwt");
            var key = jwt["Key"]?.Trim();
            var issuer = jwt["Issuer"]?.Trim();
            var audience = jwt["Audience"]?.Trim();

            if (string.IsNullOrEmpty(key))
                throw new InvalidOperationException("JWT Key missing.");

            var keyBytes = Encoding.UTF8.GetBytes(key);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                    IssuerSigningKey = new SymmetricSecurityKey(keyBytes)
                };

                options.Events = new JwtBearerEvents
                {
                    OnChallenge = context =>
                    {
                        context.HandleResponse();
                        context.Response.StatusCode = 401;
                        context.Response.ContentType = "application/json";
                        return context.Response.WriteAsync("{\"error\": \"Unauthorized: token invalid or missing.\"}");
                    }
                };
            });

            services.AddAuthorization();

            // CORS
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAngular", policy =>
                    policy.WithOrigins("http://localhost:4200")
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowCredentials());
            });

            // Custom services
            services.AddScoped<EmailService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IItemService, ItemService>();
            services.AddScoped<ISaleService, SaleService>();
            services.AddScoped<IItemFilterService, ItemFilterService>();
            services.AddScoped<ISaleFilterService, SaleFilterService>();
            services.AddScoped<ICategoryService, CategoryService>();

            return services;
        }
    }
}