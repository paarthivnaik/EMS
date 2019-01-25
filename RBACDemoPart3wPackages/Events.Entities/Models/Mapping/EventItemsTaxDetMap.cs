using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models.Mapping
{
    public class EventItemsTaxDetMap : EntityTypeConfiguration<EventItemsTaxDet>
    {
        public EventItemsTaxDetMap()
        {
            // Primary Key
            this.HasKey(t => t.EventItemsTaxDetId);

            // Properties
            // Table & Column Mappings
            this.ToTable("EventItemsTaxDet");
            this.Property(t => t.EventItemsTaxDetId).HasColumnName("EventItemsTaxDetId");
            this.Property(t => t.EventInfoID).HasColumnName("EventInfoID");
            this.Property(t => t.Subtotal).HasColumnName("Subtotal");
            this.Property(t => t.tax).HasColumnName("tax");
            this.Property(t => t.TaxAmount).HasColumnName("TaxAmount");
            this.Property(t => t.GrandTotal).HasColumnName("GrandTotal");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
            this.Property(t => t.CreatedOn).HasColumnName("CreatedOn");
            this.Property(t => t.ModifiedBy).HasColumnName("ModifiedBy");
            this.Property(t => t.ModifiedOn).HasColumnName("ModifiedOn");
        }
    }
}
