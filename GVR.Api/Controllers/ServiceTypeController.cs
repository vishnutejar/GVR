using Gvr.Api.Models;
using GVR.Data.GVRAppDbContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GVR.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServiceTypeController : ControllerBase
{
    private readonly GVRAppDbContext _dbContext;

    public ServiceTypeController(GVRAppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ServiceType>>> GetAll()
    {
        var serviceTypes = await _dbContext.ServiceTypes.ToListAsync();
        return Ok(serviceTypes);
    }

    [HttpPost]
    public async Task<ActionResult<ServiceType>> CreateServiceType(ServiceType serviceType)
    {
        if (string.IsNullOrWhiteSpace(serviceType.Name) || serviceType.Price <= 0)
        {
            return BadRequest(new { message = "Name and price are required, and price must be greater than zero." });
        }

        serviceType.CreatedAt = DateTime.UtcNow;
        serviceType.UpdatedAt = DateTime.UtcNow;

        _dbContext.ServiceTypes.Add(serviceType);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAll), new { id = serviceType.ServiceTypeId }, serviceType);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ServiceType>> UpdateServiceType(int id, ServiceType serviceType)
    {
        var existingServiceType = await _dbContext.ServiceTypes.FindAsync(id);
        if (existingServiceType == null)
        {
            return NotFound(new { message = "Service type not found." });
        }

        if (string.IsNullOrWhiteSpace(serviceType.Name) || serviceType.Price <= 0)
        {
            return BadRequest(new { message = "Name and price are required, and price must be greater than zero." });
        }

        existingServiceType.Name = serviceType.Name;
        existingServiceType.Description = serviceType.Description;
        existingServiceType.Price = serviceType.Price;
        existingServiceType.UpdatedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();

        return Ok(existingServiceType);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteServiceType(int id)
    {
        var existingServiceType = await _dbContext.ServiceTypes.FindAsync(id);
        if (existingServiceType == null)
        {
            return NotFound(new { message = "Service type not found." });
        }

        _dbContext.ServiceTypes.Remove(existingServiceType);
        await _dbContext.SaveChangesAsync();

        return Ok(new { message = "Service type deleted successfully." });
    }
}