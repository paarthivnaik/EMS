using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models.Mapping
{
    public class SalaryPaidMap : EntityTypeConfiguration<SalaryPaid>
    {
        public SalaryPaidMap()
        {
            // Primary Key
            this.HasKey(t => t.SalaryPaidID);

            // Properties
            // Table & Column Mappings
            this.ToTable("SalaryPaid");
            this.Property(t => t.SalaryPaidID).HasColumnName("SalaryPaidID");
            this.Property(t => t.EmployeeID).HasColumnName("EmployeeID");
            this.Property(t => t.EmployeeCode).HasColumnName("EmployeeCode");
            this.Property(t => t.PaidMonth).HasColumnName("PaidMonth");
            this.Property(t => t.Salary).HasColumnName("Salary");
            this.Property(t => t.Incentives).HasColumnName("Incentives");
            this.Property(t => t.Bonous).HasColumnName("Bonous");
            this.Property(t => t.Status).HasColumnName("Status");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
            this.Property(t => t.CreatedOn).HasColumnName("CreatedOn");
            this.Property(t => t.ModifiedBy).HasColumnName("ModifiedBy");
            this.Property(t => t.ModifiedOn).HasColumnName("ModifiedOn");
            this.Property(t => t.Description).HasColumnName("Description");
        }
    }
}
