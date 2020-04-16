using System;
using System.ComponentModel.DataAnnotations;

namespace TEST.Models
{
    public class RouteArchive
    {
        [Key]
        public int RouteArchiveId { get; set; }
        public string RouteName { get; set; }
        public DateTime dateTime { get; set; }
        public string RouteComment { get; set; }
        
    }
}
