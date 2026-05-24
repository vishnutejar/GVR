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
    }
}
