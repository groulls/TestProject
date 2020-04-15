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

        [HttpGet]
        public IEnumerable<RouteArchive> getlist()
        {
            return _context.RouteArchive.ToList();
        }
        [HttpGet("{id}")]

        public RouteArchive getOne(int id)
        {
            if (RouteArchiveExists(id))
            {
                return _context.RouteArchive.Where(r => r.RouteArchiveId == id).FirstOrDefault();  
            }
            else
            {
                return null;
            }
        }

       [HttpPost("add")]

       public RouteArchive Add(RouteArchive model)
        {
            if(model.RouteName != "")
            {
                _context.RouteArchive.Add(model);
                _context.SaveChangesAsync();
                return model;
            }
            else
            {
                return null;
            }
        }

        private bool RouteArchiveExists(int id)
        {
            return _context.RouteArchive.Any(e => e.RouteArchiveId == id);
        }
    }
}
