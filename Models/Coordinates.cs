using System.ComponentModel.DataAnnotations;


namespace TEST.Models
{
    public class Coordinates
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public string CoordX { get; set; }
        public string CoordY { get; set; }

    }
}
