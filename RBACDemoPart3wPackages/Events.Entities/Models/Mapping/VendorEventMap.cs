using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models.Mapping
{
    public class VendorEventMap : EntityTypeConfiguration<VendorEvent>
    {
      public VendorEventMap()
      {
          // Primary Key
          this.HasKey(t => t.VendorEventID);

          // Properties
          // Table & Column Mappings
          this.ToTable("VendorEvents");
          this.Property(t => t.VendorEventID).HasColumnName("VendorEventID");
          this.Property(t => t.VendorID).HasColumnName("VendorID");
          this.Property(t => t.EventInfoID).HasColumnName("EventInfoID");
          this.Property(t => t.Ammmount).HasColumnName("Ammmount");
          this.Property(t => t.ProgramDate).HasColumnName("ProgramDate");
          this.Property(t => t.Status).HasColumnName("Status");
          this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
          this.Property(t => t.CreatedOn).HasColumnName("CreatedOn");
          this.Property(t => t.ModifiedBy).HasColumnName("ModifiedBy");
          this.Property(t => t.ModifiedOn).HasColumnName("ModifiedOn");
          this.Property(t => t.EventInfoIDValue).HasColumnName("EventInfoIDValue");
          this.Property(t => t.IsSettled).HasColumnName("IsSettled");


      }
    }
}
