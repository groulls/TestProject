using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TEST.Data;
using TEST.Models;

namespace TEST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RouteArchivesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RouteArchivesController(ApplicationDbContext context)
        {
            _context = context;
        }

       

        private bool RouteArchiveExists(int id)
        {
            return _context.RouteArchive.Any(e => e.RouteArchiveId == id);
        }
    }
}
