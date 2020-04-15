using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TEST.Data.Migrations
{
    public partial class RouteArchive : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RouteArchive",
                columns: table => new
                {
                    RouteArchiveId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RouteName = table.Column<string>(nullable: true),
                    dateTime = table.Column<DateTime>(nullable: false),
                    RouteComment = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RouteArchive", x => x.RouteArchiveId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RouteArchive");
        }
    }
}
