using Events.Entities.Models;
using Events.Entities.Models.Mapping;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.EventItemsRep
{
    public class EventItemsContext : BaseContext<EventItemsContext>
    {
        public DbSet<EventInfo> EventInfos { get; set; }
        public DbSet<EventItem> EventItems { get; set; }
        public DbSet<EventItemsTaxDet> EventItemsTaxDets { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new EventInfoMap());
            modelBuilder.Configurations.Add(new EventItemMap());
            modelBuilder.Configurations.Add(new EventItemsTaxDetMap());

        }
    }
}
