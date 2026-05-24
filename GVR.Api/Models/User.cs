using System.ComponentModel.DataAnnotations;

namespace GVR.Api.Models;

public class User
{
    public int UserId { get; set; }

    [Required]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    [Required]
    public string Phone { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
}
