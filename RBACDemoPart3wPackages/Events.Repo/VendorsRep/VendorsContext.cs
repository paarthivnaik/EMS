using Events.Entities.Models;
using Events.Entities.Models.Light;
using Events.Entities.Models.Light.Mapping;
using Events.Entities.Models.Mapping;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.VendorsRep
{
   public class VendorsContext:BaseContext<VendorsContext>
    {
       public DbSet<Vendor> Vendors { get; set; }
       public DbSet<VendorEvent> VendorEvents { get; set; }
       public DbSet<VendorAmmountPaid> VendorAmmountPaids { get; set; }
       public DbSet<EventInfoLight> EventInfoLights { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new VendorMap());
            modelBuilder.Configurations.Add(new VendorEventMap());
            modelBuilder.Configurations.Add(new VendorAmmountPaidMap());
            modelBuilder.Configurations.Add(new EventInfoLightMap());

        }
    }
}
