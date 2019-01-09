using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models.Mapping
{
    public class ListEntriesCustomMap : EntityTypeConfiguration<ListEntriesCustom>
    {
        public ListEntriesCustomMap()
        {
            // Primary Key
            this.HasKey(t => t.ListEntryID);

            // Properties
            this.Property(t => t.ListEntryName)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ListEntryDescription)
                .HasMaxLength(100);

            this.Property(t => t.EntryType)
                .IsRequired()
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("ListEntries");
            this.Property(t => t.ListEntryID).HasColumnName("ListEntryID");
            this.Property(t => t.ListEntryName).HasColumnName("ListEntryName");
            this.Property(t => t.ListEntryDescription).HasColumnName("ListEntryDescription");
            this.Property(t => t.EntryType).HasColumnName("EntryType");
            this.Property(t => t.Status).HasColumnName("Status");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
            this.Property(t => t.CreatedOn).HasColumnName("CreatedOn");
            this.Property(t => t.ModifiedBy).HasColumnName("ModifiedBy");
            this.Property(t => t.ModifiedOn).HasColumnName("ModifiedOn");
        }
    }
}
