using Microsoft.EntityFrameworkCore.Migrations;

namespace TEST.Data.Migrations
{
    public partial class ApplicationUserFK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "RouteArchive",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RouteArchive_UserId",
                table: "RouteArchive",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_RouteArchive_AspNetUsers_UserId",
                table: "RouteArchive",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RouteArchive_AspNetUsers_UserId",
                table: "RouteArchive");

            migrationBuilder.DropIndex(
                name: "IX_RouteArchive_UserId",
                table: "RouteArchive");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "RouteArchive");
        }
    }
}
