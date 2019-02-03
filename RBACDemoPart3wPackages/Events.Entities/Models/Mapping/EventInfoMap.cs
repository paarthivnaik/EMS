using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Events.Entities.Models.Mapping
{
    public class EventInfoMap : EntityTypeConfiguration<EventInfo>
    {
        public EventInfoMap()
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

          
            this.Property(t => t.Venue)
                .IsRequired()
                .HasMaxLength(500);

            this.Property(t => t.Manager)
                .HasMaxLength(100);

            this.Property(t => t.ManagerMobile)
                .HasMaxLength(15);

            // Table & Column Mappings
            this.ToTable("EventInfo");
            this.Property(t => t.EventInfoID).HasColumnName("EventInfoID");
            this.Property(t => t.EventRefID).HasColumnName("EventRefID");
            this.Property(t => t.CustomerName).HasColumnName("CustomerName");
            this.Property(t => t.MobileNo).HasColumnName("MobileNo");
            this.Property(t => t.AlternateMobileNo).HasColumnName("AlternateMobileNo");
            this.Property(t => t.EventType).HasColumnName("EventType");
            this.Property(t => t.EventTypeValue).HasColumnName("EventTypeValue");
            this.Property(t => t.EventStartDate).HasColumnName("EventStartDate");
            this.Property(t => t.EventEndDate).HasColumnName("EventEndDate");
           
            this.Property(t => t.Venue).HasColumnName("Venue");
            this.Property(t => t.Manager).HasColumnName("Manager");
            this.Property(t => t.ManagerMobile).HasColumnName("ManagerMobile");
            this.Property(t => t.TotalPrice).HasColumnName("TotalPrice");
          
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
            this.Property(t => t.CreatedOn).HasColumnName("CreatedOn");
            this.Property(t => t.ModifiedBy).HasColumnName("ModifiedBy");
            this.Property(t => t.ModifiedOn).HasColumnName("ModifiedOn");
            this.Property(t => t.Status).HasColumnName("Status");
            this.Property(t => t.IsConfirm).HasColumnName("IsConfirm");
            this.Property(t => t.IfFNF).HasColumnName("IfFNF");
        }
    }
}
