namespace GVR.Api.Models;

public class Appointment
{
    public int AppointmentId { get; set; }
    public int UserId { get; set; }
    public string ServiceType { get; set; } = string.Empty;
    public DateTime AppointmentDate { get; set; }
    public string Notes { get; set; } = string.Empty;
    public string Status { get; set; } = "Upcoming";
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public User? User { get; set; }
}
