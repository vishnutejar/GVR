using Gvr.Api.Models;
using GVR.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GVR.Data.GVRAppDbContext
{
    public class GVRAppDbContext : DbContext
    {
        public GVRAppDbContext(DbContextOptions<GVRAppDbContext> options) : base(options)
        {

        }

        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<ServiceType> ServiceTypes { get; set; }
    }
}
