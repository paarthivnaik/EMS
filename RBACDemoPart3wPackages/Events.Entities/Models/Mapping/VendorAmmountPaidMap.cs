using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models.Mapping
{
    public class VendorAmmountPaidMap : EntityTypeConfiguration<VendorAmmountPaid>
    {
        public VendorAmmountPaidMap()
        {
            // Primary Key
            this.HasKey(t => t.VendorAmmountPaidID);
            // Properties
            this.Property(t => t.BillNo)
                .HasMaxLength(10);
            this.Property(t => t.Particular)
               .HasMaxLength(250);
            // Properties
            // Table & Column Mappings
            this.ToTable("VendorAmmountPaid");
            this.Property(t => t.VendorAmmountPaidID).HasColumnName("VendorAmmountPaidID");
            this.Property(t => t.VendorEventID).HasColumnName("VendorEventID");
            this.Property(t => t.AmmountPaid).HasColumnName("AmmountPaid");
            this.Property(t => t.PaidDate).HasColumnName("PaidDate");
            this.Property(t => t.Status).HasColumnName("Status");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
            this.Property(t => t.CreatedOn).HasColumnName("CreatedOn");
            this.Property(t => t.ModifiedBy).HasColumnName("ModifiedBy");
            this.Property(t => t.ModifiedOn).HasColumnName("ModifiedOn");
            this.Property(t => t.BillNo).HasColumnName("BillNo");
            this.Property(t => t.Particular).HasColumnName("Particular");
            this.Property(t => t.Description).HasColumnName("Description");

        }
    }
}
