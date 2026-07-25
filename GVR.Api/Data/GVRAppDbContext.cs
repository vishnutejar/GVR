using Gvr.Api.Models;
using GVR.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GVR.Data.GVRAppDbContext
{
    public class GVRAppDbContext(DbContextOptions<GVRAppDbContext> options) : DbContext(options)
    {
        public required DbSet<Doctor> Doctors { get; set; }
        public required DbSet<User> Users { get; set; }
        public required DbSet<Appointment> Appointments { get; set; }
        public required DbSet<ServiceType> ServiceTypes { get; set; }
    }
}
