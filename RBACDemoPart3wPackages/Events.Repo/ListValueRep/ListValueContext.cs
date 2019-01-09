using Events.Entities.Models;
using Events.Entities.Models.Mapping;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.ListValueRep
{
    public class ListValueContext : BaseContext<ListValueContext>
    {
        public DbSet<ListValuesCustom> ListValuesCustoms { get; set; }
        public DbSet<ListEntriesCustom> ListEntriesCustoms { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new ListValuesCustomMap());
            modelBuilder.Configurations.Add(new ListEntriesCustomMap());

        }
    }
}
