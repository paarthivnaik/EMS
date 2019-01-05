using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using Events.Entities.Models.Mapping;

namespace Events.Entities.Models
{
    public partial class RBACV1Context : DbContext
    {
        static RBACV1Context()
        {
            Database.SetInitializer<RBACV1Context>(null);
        }

        public RBACV1Context()
            : base("Name=RBACV1Context")
        {
        }

        public DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }
        public DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }
        public DbSet<EventInfo> EventInfoes { get; set; }
        public DbSet<PERMISSION> PERMISSIONS { get; set; }
        public DbSet<ROLE> ROLES { get; set; }
        public DbSet<USER> USERS { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new AspNetUserClaimMap());
            modelBuilder.Configurations.Add(new AspNetUserLoginMap());
            modelBuilder.Configurations.Add(new EventInfoMap());
            modelBuilder.Configurations.Add(new PERMISSIONMap());
            modelBuilder.Configurations.Add(new ROLEMap());
            modelBuilder.Configurations.Add(new USERMap());
        }
    }
}
