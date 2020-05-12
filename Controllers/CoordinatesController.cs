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
    [Route("[controller]")]
    [ApiController]
    public class CoordinatesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CoordinatesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Coordinates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Coordinates>>> GetCoordinates()
        {
            return await _context.Coordinates.ToListAsync();
        }

        // GET: api/Coordinates/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Coordinates>> GetCoordinates(int id)
        {
            var coordinates = await _context.Coordinates.FindAsync(id);

            if (coordinates == null)
            {
                return NotFound();
            }

            return coordinates;
        }

        // PUT: api/Coordinates/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCoordinates(int id, Coordinates coordinates)
        {
            if (id != coordinates.ID)
            {
                return BadRequest();
            }

            _context.Entry(coordinates).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CoordinatesExists(id))
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

        // POST: api/Coordinates
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Coordinates>> PostCoordinates(Coordinates coordinates)
        {
            _context.Coordinates.Add(coordinates);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCoordinates", new { id = coordinates.ID }, coordinates);
        }

        // DELETE: api/Coordinates/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Coordinates>> DeleteCoordinates(int id)
        {
            var coordinates = await _context.Coordinates.FindAsync(id);
            if (coordinates == null)
            {
                return NotFound();
            }

            _context.Coordinates.Remove(coordinates);
            await _context.SaveChangesAsync();

            return coordinates;
        }

        private bool CoordinatesExists(int id)
        {
            return _context.Coordinates.Any(e => e.ID == id);
        }
    }
}
