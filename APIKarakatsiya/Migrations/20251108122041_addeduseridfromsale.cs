using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIKarakatsiya.Migrations
{
    /// <inheritdoc />
    public partial class addeduseridfromsale : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Sales",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Sales");
        }
    }
}
