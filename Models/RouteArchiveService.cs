using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TEST.Data;

namespace TEST.Models
{
    public class RouteArchiveService : IRouteArchive
    {
        public async Task<List<RouteArchive>> GetRouteArchives()
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                return await (from r in db.RouteArchive.AsNoTracking()
                              select new RouteArchive
                              {
                                  RouteName = r.routname,
                                  dateTime = r.datetime,
                                  RouteComment = r.routecomments
                              }).ToListAsunc();
            }
            throw new NotImplementedException();
        }
    }
}
