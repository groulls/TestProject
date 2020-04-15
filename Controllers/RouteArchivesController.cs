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

        // GET: api/RouteArchives
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RouteArchive>>> GetRouteArchive()
        {
            return await _context.RouteArchive.ToListAsync();
        }

        // GET: api/RouteArchives/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RouteArchive>> GetRouteArchive(int id)
        {
            var routeArchive = await _context.RouteArchive.FindAsync(id);

            if (routeArchive == null)
            {
                return NotFound();
            }

            return routeArchive;
        }

        // PUT: api/RouteArchives/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRouteArchive(int id, RouteArchive routeArchive)
        {
            if (id != routeArchive.RouteArchiveId)
            {
                return BadRequest();
            }

            _context.Entry(routeArchive).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RouteArchiveExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RouteArchives
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<RouteArchive>> PostRouteArchive(RouteArchive routeArchive)
        {
            _context.RouteArchive.Add(routeArchive);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRouteArchive", new { id = routeArchive.RouteArchiveId }, routeArchive);
        }

        // DELETE: api/RouteArchives/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RouteArchive>> DeleteRouteArchive(int id)
        {
            var routeArchive = await _context.RouteArchive.FindAsync(id);
            if (routeArchive == null)
            {
                return NotFound();
            }

            _context.RouteArchive.Remove(routeArchive);
            await _context.SaveChangesAsync();

            return routeArchive;
        }

        private bool RouteArchiveExists(int id)
        {
            return _context.RouteArchive.Any(e => e.RouteArchiveId == id);
        }
    }
}
