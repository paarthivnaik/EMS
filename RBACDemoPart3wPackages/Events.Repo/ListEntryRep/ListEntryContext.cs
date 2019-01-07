using Events.Entities.Models;
using Events.Entities.Models.Mapping;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.ListEntryRep
{
    public class ListEntryContext : BaseContext<ListEntryContext>
    {
        public DbSet<ListValue> ListValues { get; set; }
        public DbSet<ListEntry> ListEntrys { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new ListValueMap());
            modelBuilder.Configurations.Add(new ListEntryMap());

        }
    }
}
