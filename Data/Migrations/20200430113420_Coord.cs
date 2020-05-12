using Microsoft.EntityFrameworkCore.Migrations;

namespace TEST.Data.Migrations
{
    public partial class Coord : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CoordY",
                table: "Coordinates",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<string>(
                name: "CoordX",
                table: "Coordinates",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "CoordY",
                table: "Coordinates",
                type: "float",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "CoordX",
                table: "Coordinates",
                type: "float",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
