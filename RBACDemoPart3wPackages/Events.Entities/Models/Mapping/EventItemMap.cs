using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models.Mapping
{
    public class EventItemMap : EntityTypeConfiguration<EventItem>
    {

        public EventItemMap()
        {
            // Primary Key
            this.HasKey(t => t.EventItemID);

            // Properties
            this.Property(t => t.CategoryValue)
                .HasMaxLength(150);

            this.Property(t => t.ItemName)
                .HasMaxLength(150);

            // Table & Column Mappings
            this.ToTable("EventItem");
            this.Property(t => t.EventItemID).HasColumnName("EventItemID");
            this.Property(t => t.EventInfoID).HasColumnName("EventInfoID");
            this.Property(t => t.CategoryID).HasColumnName("CategoryID");
            this.Property(t => t.CategoryValue).HasColumnName("CategoryValue");
            this.Property(t => t.ItemName).HasColumnName("ItemName");
            this.Property(t => t.Quantity).HasColumnName("Quantity");
            this.Property(t => t.Price).HasColumnName("Price");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
            this.Property(t => t.CreatedOn).HasColumnName("CreatedOn");
            this.Property(t => t.ModifiedBy).HasColumnName("ModifiedBy");
            this.Property(t => t.ModifiedOn).HasColumnName("ModifiedOn");
            this.Property(t => t.Status).HasColumnName("Status");
        }
    }
}
