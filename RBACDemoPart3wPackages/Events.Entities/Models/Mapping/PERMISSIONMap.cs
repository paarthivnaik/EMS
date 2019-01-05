using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Events.Entities.Models.Mapping
{
    public class PERMISSIONMap : EntityTypeConfiguration<PERMISSION>
    {
        public PERMISSIONMap()
        {
            // Primary Key
            this.HasKey(t => t.PermissionId);

            // Properties
            this.Property(t => t.PermissionDescription)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("PERMISSIONS");
            this.Property(t => t.PermissionId).HasColumnName("PermissionId");
            this.Property(t => t.PermissionDescription).HasColumnName("PermissionDescription");

            // Relationships
            this.HasMany(t => t.ROLES)
                .WithMany(t => t.PERMISSIONS)
                .Map(m =>
                    {
                        m.ToTable("LNK_ROLE_PERMISSION");
                        m.MapLeftKey("PermissionId");
                        m.MapRightKey("RoleId");
                    });


        }
    }
}
