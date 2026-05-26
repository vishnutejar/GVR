namespace Gvr.Api.Models;
public class ServiceType
{
    public int ServiceTypeId { get; set; }
    public string? ServiceCategory { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}