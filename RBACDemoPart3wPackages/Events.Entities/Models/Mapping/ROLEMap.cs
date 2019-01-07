using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Events.Entities.Models.Mapping
{
    public class ROLEMap : EntityTypeConfiguration<ROLE>
    {
        public ROLEMap()
        {
            // Primary Key
            this.HasKey(t => t.RoleId);

            // Properties
            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(256);

            // Table & Column Mappings
            this.ToTable("ROLES");
            this.Property(t => t.RoleId).HasColumnName("RoleId");
            this.Property(t => t.LastModified).HasColumnName("LastModified");
            this.Property(t => t.IsSysAdmin).HasColumnName("IsSysAdmin");
            this.Property(t => t.RoleDescription).HasColumnName("RoleDescription");
            this.Property(t => t.Name).HasColumnName("Name");

            // Relationships
            this.HasMany(t => t.USERS)
                .WithMany(t => t.ROLES)
                .Map(m =>
                    {
                        m.ToTable("LNK_USER_ROLE");
                        m.MapLeftKey("RoleId");
                        m.MapRightKey("UserId");
                    });


        }
    }
}
