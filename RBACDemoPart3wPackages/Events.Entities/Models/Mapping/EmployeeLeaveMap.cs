using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models.Mapping
{
    public class EmployeeLeaveMap : EntityTypeConfiguration<EmployeeLeave>
    {
        public EmployeeLeaveMap()
        {
            // Primary Key
            this.HasKey(t => t.EmployeeLeaveID);

            // Properties
            this.Property(t => t.LeaveValue)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.Comments)
                .HasMaxLength(200);

            // Table & Column Mappings
            this.ToTable("EmployeeLeave");
            this.Property(t => t.EmployeeLeaveID).HasColumnName("EmployeeLeaveID");
            this.Property(t => t.EmployeeID).HasColumnName("EmployeeID");
            this.Property(t => t.FromDate).HasColumnName("FromDate");
            this.Property(t => t.ToDate).HasColumnName("ToDate");
            this.Property(t => t.LeaveID).HasColumnName("LeaveID");
            this.Property(t => t.LeaveValue).HasColumnName("LeaveValue");
            this.Property(t => t.NoOfDays).HasColumnName("NoOfDays");
            this.Property(t => t.Comments).HasColumnName("Comments");
            this.Property(t => t.Status).HasColumnName("Status");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
            this.Property(t => t.CreatedOn).HasColumnName("CreatedOn");
            this.Property(t => t.ModifiedBy).HasColumnName("ModifiedBy");
            this.Property(t => t.ModifiedOn).HasColumnName("ModifiedOn");

            

        }
    }
}
