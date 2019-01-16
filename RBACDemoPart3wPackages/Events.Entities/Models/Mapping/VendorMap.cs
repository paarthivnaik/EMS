using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models.Mapping
{
    public class VendorMap : EntityTypeConfiguration<Vendor>
    {
        public VendorMap()
        {
            // Primary Key
            this.HasKey(t => t.VendorID);

            // Properties
            this.Property(t => t.VendorCode)
                .HasMaxLength(9);

            this.Property(t => t.FirstName)
                .HasMaxLength(100);

            this.Property(t => t.LastName)
                .HasMaxLength(100);

            this.Property(t => t.SurName)
                .HasMaxLength(100);

            this.Property(t => t.MobileNo)
                .HasMaxLength(15);

            this.Property(t => t.AlternateMobileNo)
                .HasMaxLength(15);

            this.Property(t => t.Address)
                .HasMaxLength(400);

            this.Property(t => t.ProofValue)
                .HasMaxLength(100);
            this.Property(t => t.Organization)
              .HasMaxLength(200);
            this.Property(t => t.UniqueID)
             .HasMaxLength(25);

            // Table & Column Mappings
            this.ToTable("Vendor");
            this.Property(t => t.VendorID).HasColumnName("VendorID");
            this.Property(t => t.VendorCode).HasColumnName("VendorCode");
            this.Property(t => t.FirstName).HasColumnName("FirstName");
            this.Property(t => t.LastName).HasColumnName("LastName");
            this.Property(t => t.SurName).HasColumnName("SurName");
            this.Property(t => t.MobileNo).HasColumnName("MobileNo");
            this.Property(t => t.AlternateMobileNo).HasColumnName("AlternateMobileNo");
            this.Property(t => t.Address).HasColumnName("Address");
            this.Property(t => t.Proof).HasColumnName("Proof");
            this.Property(t => t.ProofValue).HasColumnName("ProofValue");
            this.Property(t => t.Status).HasColumnName("Status");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
            this.Property(t => t.CreatedOn).HasColumnName("CreatedOn");
            this.Property(t => t.ModifiedBy).HasColumnName("ModifiedBy");
            this.Property(t => t.ModifiedOn).HasColumnName("ModifiedOn");
            this.Property(t => t.Organization).HasColumnName("Organization");
            this.Property(t => t.UniqueID).HasColumnName("UniqueID");
        }
    }
}
