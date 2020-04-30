using Microsoft.AspNetCore.Hosting;


[assembly: HostingStartup(typeof(TEST.Areas.Identity.IdentityHostingStartup))]
namespace TEST.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
            });
        }
    }
}