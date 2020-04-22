using TEST.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;


namespace TEST.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
  
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) :base(options, operationalStoreOptions)
        {
        }
        public DbSet<RouteArchive> RouteArchive { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    var rng = new Random();
        //    base.OnModelCreating(modelBuilder);

        //    modelBuilder.Entity<RouteArchive>().HasData(new RouteArchive
        //    {
        //        RouteArchiveId = rng.Next(1,10),
        //       RouteName = "TEST_NAME",
        //       dateTime = DateTime.Today,
        //       RouteComment = "TEST_COMMNET"


        //    });
        //}
    }
}
