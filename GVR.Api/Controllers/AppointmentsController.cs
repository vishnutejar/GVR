using GVR.Api.Models;
using GVR.Data.GVRAppDbContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GVR.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AppointmentsController : ControllerBase
{
    private readonly GVRAppDbContext _dbContext;

    public AppointmentsController(GVRAppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<Appointment>>> GetByUser(int userId, [FromQuery] string? filter = null)
    {
        var appointments = await _dbContext.Appointments
            .Where(a => a.UserId == userId)
            .OrderBy(a => a.AppointmentDate)
            .ToListAsync();

        if (filter?.ToLower() == "history")
        {
            return Ok(appointments.Where(a => a.AppointmentDate < DateTime.UtcNow));
        }

        if (filter?.ToLower() == "upcoming")
        {
            return Ok(appointments.Where(a => a.AppointmentDate >= DateTime.UtcNow));
        }

        return Ok(appointments);
    }

    [HttpPost]
    public async Task<ActionResult<Appointment>> CreateAppointment(Appointment appointment)
    {
        if (appointment.UserId <= 0 || string.IsNullOrWhiteSpace(appointment.ServiceType) || appointment.AppointmentDate == default)
        {
            return BadRequest(new { message = "User, service type and appointment date are required." });
        }

        appointment.Status = "Upcoming";
        appointment.CreatedAt = DateTime.UtcNow;
        appointment.UpdatedAt = DateTime.UtcNow;

        _dbContext.Appointments.Add(appointment);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetByUser), new { userId = appointment.UserId }, appointment);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Appointment>> UpdateAppointment(int id, Appointment appointment)
    {
        var existing = await _dbContext.Appointments.FirstOrDefaultAsync(a => a.AppointmentId == id);
        if (existing == null)
        {
            return NotFound();
        }

        existing.ServiceType = appointment.ServiceType;
        existing.AppointmentDate = appointment.AppointmentDate;
        existing.Notes = appointment.Notes;
        existing.Status = appointment.Status;
        existing.UpdatedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAppointment(int id)
    {
        var existing = await _dbContext.Appointments.FirstOrDefaultAsync(a => a.AppointmentId == id);
        if (existing == null)
        {
            return NotFound();
        }

        _dbContext.Appointments.Remove(existing);
        await _dbContext.SaveChangesAsync();
        return NoContent();
    }
}
