using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models.Mapping
{
    public class ExpensMap : EntityTypeConfiguration<Expens>
    {
        public ExpensMap()
        {
            // Primary Key
            this.HasKey(t => t.ExpenseID);

            // Properties
            this.Property(t => t.ExpenseRefID)
                .HasMaxLength(10);

            this.Property(t => t.ParticularValue)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.BillRefNo)
                .HasMaxLength(50);

            this.Property(t => t.Description)
                .HasMaxLength(200);

            // Table & Column Mappings
            this.ToTable("Expenses");
            this.Property(t => t.ExpenseID).HasColumnName("ExpenseID");
            this.Property(t => t.ExpenseRefID).HasColumnName("ExpenseRefID");
            this.Property(t => t.Particular).HasColumnName("Particular");
            this.Property(t => t.ParticularValue).HasColumnName("ParticularValue");
            this.Property(t => t.BillRefNo).HasColumnName("BillRefNo");
            this.Property(t => t.Ammount).HasColumnName("Ammount");
            this.Property(t => t.ExpenseDate).HasColumnName("ExpenseDate");
            this.Property(t => t.SubmissionDate).HasColumnName("SubmissionDate");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
            this.Property(t => t.CreatedOn).HasColumnName("CreatedOn");
            this.Property(t => t.ModifiedBy).HasColumnName("ModifiedBy");
            this.Property(t => t.ModifiedOn).HasColumnName("ModifiedOn");
            this.Property(t => t.Status).HasColumnName("Status");
        }
    }
}
