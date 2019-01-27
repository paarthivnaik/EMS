using Events.Entities.Models;
using Events.Entities.Models.Mapping;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.EventItemsTaxDetails
{
    public class EventItemsTaxContext : BaseContext<EventItemsTaxContext>
    {
        public DbSet<EventItemsTaxDet> EventItemsTaxDets { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new EventItemsTaxDetMap());
           
        }
    }
}
