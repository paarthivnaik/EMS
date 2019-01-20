using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models.Light.Mapping
{
    public class EventInfoLightMap : EntityTypeConfiguration<EventInfoLight>
    {
        public EventInfoLightMap()
        {
            // Primary Key
            this.HasKey(t => t.EventInfoID);

            // Properties
            this.Property(t => t.EventRefID)
                .HasMaxLength(10);

            this.Property(t => t.CustomerName)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.MobileNo)
                .IsRequired()
                .HasMaxLength(15);

            this.Property(t => t.AlternateMobileNo)
                .HasMaxLength(15);

            this.Property(t => t.EventTypeValue)
                .IsRequired()
                .HasMaxLength(200);

           

            // Table & Column Mappings
            this.ToTable("EventInfo");
            this.Property(t => t.EventInfoID).HasColumnName("EventInfoID");
            this.Property(t => t.EventRefID).HasColumnName("EventRefID");
            this.Property(t => t.CustomerName).HasColumnName("CustomerName");
            this.Property(t => t.MobileNo).HasColumnName("MobileNo");
            this.Property(t => t.AlternateMobileNo).HasColumnName("AlternateMobileNo");
            this.Property(t => t.EventType).HasColumnName("EventType");
            this.Property(t => t.EventTypeValue).HasColumnName("EventTypeValue");
           
            this.Property(t => t.Status).HasColumnName("Status");
        }
    }
}
