using GVR.Api.Models;
using GVR.Data.GVRAppDbContext;
using Microsoft.AspNetCore.Mvc;

namespace GVR.Api.Controllers;
[ApiController]
[Route("api/[controller]")]
public class DoctorsController(GVRAppDbContext gVRAppDbContext) : ControllerBase
{
    private readonly GVRAppDbContext gVRAppDbContext = gVRAppDbContext;

    [HttpGet]
    public ActionResult<IEnumerable<Doctor>> GetDoctors()
    {
        return Ok(gVRAppDbContext.Doctors.ToList());
    }

    [HttpGet("{id}")]
    public ActionResult<Doctor> GetDoctor(int id)
    {
        var doctor = gVRAppDbContext.Doctors.FirstOrDefault(d => d.DoctorId == id);
        if (doctor == null) return NotFound();
        return Ok(doctor);
    }

    [HttpPost]
    public ActionResult<Doctor> AddDoctor(Doctor doctor)
    {
        gVRAppDbContext.Doctors.Add(doctor);
        gVRAppDbContext.SaveChanges();
        return CreatedAtAction(nameof(GetDoctor), new { id = doctor.DoctorId }, doctor);
    }

    [HttpPut("{id}")]
    public ActionResult<Doctor> UpdateDoctor(int id, Doctor doctor)
    {
        var existingDoctor = gVRAppDbContext.Doctors.FirstOrDefault(d => d.DoctorId == id);
        if (existingDoctor == null) return NotFound();

        existingDoctor.FullName = doctor.FullName;
        existingDoctor.Specialization = doctor.Specialization;
        existingDoctor.ExperienceYears = doctor.ExperienceYears;
        existingDoctor.ContactEmail = doctor.ContactEmail;
        existingDoctor.ContactPhone = doctor.ContactPhone;
        existingDoctor.Availability = doctor.Availability;
        existingDoctor.HospitalAffiliation = doctor.HospitalAffiliation;
        existingDoctor.ProfilePictureUrl = doctor.ProfilePictureUrl;
        existingDoctor.UpdatedAt = DateTime.UtcNow;

        gVRAppDbContext.SaveChanges();
        return Ok(existingDoctor);
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteDoctor(int id)
    {
        var doctor = gVRAppDbContext.Doctors.FirstOrDefault(d => d.DoctorId == id);
        if (doctor == null) return NotFound();

        gVRAppDbContext.Doctors.Remove(doctor);
        gVRAppDbContext.SaveChanges();
        return NoContent();
    }
}
