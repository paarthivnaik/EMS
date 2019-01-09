using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models.Mapping
{
    public class ListValuesCustomMap : EntityTypeConfiguration<ListValuesCustom>
    {
        public ListValuesCustomMap()
        {
            // Primary Key
            this.HasKey(t => t.ListValueID);

            // Properties
            this.Property(t => t.ListValueName)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.EntryType)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("ListValues");
            this.Property(t => t.ListValueID).HasColumnName("ListValueID");
            this.Property(t => t.ListEntryID).HasColumnName("ListEntryID");
            this.Property(t => t.ListValueName).HasColumnName("ListValueName");
            this.Property(t => t.EntryType).HasColumnName("EntryType");
            this.Property(t => t.Status).HasColumnName("Status");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
            this.Property(t => t.CreatedOn).HasColumnName("CreatedOn");
            this.Property(t => t.ModifiedBy).HasColumnName("ModifiedBy");
            this.Property(t => t.ModifiedOn).HasColumnName("ModifiedOn");

            

        }
    }
}
