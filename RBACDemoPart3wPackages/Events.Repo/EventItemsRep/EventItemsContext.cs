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
        public DbSet<EventItem> EventItems { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new EventItemMap());

        }
    }
}
