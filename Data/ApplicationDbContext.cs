using TEST.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;


namespace TEST.Data
{
    public class ApplicationDbContext : DbContext //ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options)//base(options, operationalStoreOptions)
        {
        }
        public virtual DbSet<RouteArchive> RouteArchive { get; set; }
    }
}
