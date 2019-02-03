using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models.Mapping
{
    public class CustomerAmtPaidMap : EntityTypeConfiguration<CustomerAmtPaid>
    {
        public CustomerAmtPaidMap()
        {
            // Primary Key
            this.HasKey(t => t.CustomerAmtPaidID);

            // Properties
            this.Property(t => t.CustomerAmtPaidRefID)
                .HasMaxLength(10);
            this.Property(t => t.Description)
                .HasMaxLength(250);
            this.Property(t => t.Particular)
             .HasMaxLength(250);
            // Table & Column Mappings
            this.ToTable("CustomerAmtPaid");
            this.Property(t => t.CustomerAmtPaidID).HasColumnName("CustomerAmtPaidID");
            this.Property(t => t.CustomerAmtPaidRefID).HasColumnName("CustomerAmtPaidRefID");
            this.Property(t => t.EventInfoID).HasColumnName("EventInfoID");
            this.Property(t => t.Ammount).HasColumnName("Ammount");
            this.Property(t => t.DateOfPaid).HasColumnName("DateOfPaid");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
            this.Property(t => t.CreatedOn).HasColumnName("CreatedOn");
            this.Property(t => t.ModifiedBy).HasColumnName("ModifiedBy");
            this.Property(t => t.ModifiedOn).HasColumnName("ModifiedOn");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.Particular).HasColumnName("Particular");
            this.Property(t => t.Status).HasColumnName("Status");

            


        }
    }
}
