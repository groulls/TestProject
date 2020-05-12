using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer4.Extensions;
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

            //string userid = User.GetSubjectId();
            var subjectId = HttpContext.User.Identity.GetAuthenticationMethods().Count() > 0 ? HttpContext.User.Identity.GetSubjectId() : "";
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
         
            if (!string.IsNullOrEmpty(userId))
            {
                return await _context.RouteArchive.Where(x => x.UserId == userId).ToListAsync();
            }
            else
            {
                return null;
            }
            //var list = await _context.RouteArchive.ToListAsync();
            //return list;
        }

       [HttpPost]      
        public async Task<ActionResult<RouteArchive>> Add(RouteArchive model)
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
