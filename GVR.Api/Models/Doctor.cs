namespace GVR.Api.Models;

public class Doctor
{
    public int DoctorId { get; set; }
    public string? FullName { get; set; }
    public string? Specialization { get; set; }
    public int ExperienceYears { get; set; }
    public string? ContactEmail { get; set; }
    public string? ContactPhone { get; set; }
    public string? Availability { get; set; }
    public string? HospitalAffiliation { get; set; }
    public string? ProfilePictureUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
