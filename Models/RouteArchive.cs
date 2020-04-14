using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TEST.Models
{
    public class RouteArchive
    {
        int RouteArchiveID { get; set; }
        int UserID_FK { get; set; }
        string RouteName { get; set; }
        DateTime dateTime { get; set; }
        string RouteComment { get; set; }
        int RouteLenght { get; set; }
        
    }
}
