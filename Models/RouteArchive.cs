using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TEST.Models
{
    public class RouteArchive
    {
        [Key]
        public int RouteArchiveId { get; set; }
        public string RouteName { get; set; }
        public DateTime dateTime { get; set; }
        public string RouteComment { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual ApplicationUser ApplicationUser { get; set; }
        
    }
}
