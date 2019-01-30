using Events.Entities.Models.Light;
using Events.Entities.Models.Light.Mapping;
using Events.Entities.Models.Mapping;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.CustomerAmtPaid
{
    public class CustomerAmtPaidContext : BaseContext<CustomerAmtPaidContext>
    {
        public DbSet<Events.Entities.Models.CustomerAmtPaid> CustomerAmtPaids { get; set; }
        public DbSet<EventInfoLight> EventInfoLights { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new CustomerAmtPaidMap());
            modelBuilder.Configurations.Add(new EventInfoLightMap());
           

        }
    }
}
