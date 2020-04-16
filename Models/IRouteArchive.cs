using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TEST.Models
{
    public interface IRouteArchive
    {
        Task<IQueryable<RouteArchive>> GetRouteArchives();
    }
}
