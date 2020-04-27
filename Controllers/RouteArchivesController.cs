using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TEST.Data;
using TEST.Models;

namespace TEST.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    public class RouteArchivesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RouteArchivesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RouteArchive>>> GetRouteArchive()
        {
            var list = await _context.RouteArchive.ToListAsync();
            return list;
        }

        //[HttpGet("{id}")]
        //public RouteArchive getOne(int id)
        //{
        //    if (RouteArchiveExists(id))
        //    {
        //        return _context.RouteArchive.Where(r => r.RouteArchiveId == id).FirstOrDefault();  
        //    }
        //    else
        //    {
        //        return null;
        //    }
        //}
        //[HttpPost]
        //[Route("temp")]
        //public HttpResponseMessage Add(RouteArchive model)
        //{
        //    var result = new HttpResponseMessage(System.Net.HttpStatusCode.OK);
        //    _context.RouteArchive.Add(model);
        //    _context.SaveChanges();
        //    return result;
        //}


        [HttpPost]
      
       public async Task<ActionResult<RouteArchive>> Create([FromBody]RouteArchive model)
        {
           
                _context.RouteArchive.Add(model);
                await _context.SaveChangesAsync();
                return CreatedAtAction("Create",model);
           
        }

        private bool RouteArchiveExists(int id)
        {
            return _context.RouteArchive.Any(e => e.RouteArchiveId == id);
        }
    }
}
