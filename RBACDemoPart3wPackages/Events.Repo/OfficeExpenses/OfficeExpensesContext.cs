using Events.Entities.Models;
using Events.Entities.Models.Mapping;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.OfficeExpenses
{
    public class OfficeExpensesContext : BaseContext<OfficeExpensesContext>
    {
        public DbSet<Expens> Expenses { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new ExpensMap());
           

        }
    }
}
