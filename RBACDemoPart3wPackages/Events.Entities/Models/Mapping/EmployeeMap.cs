using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models.Mapping
{
   public class EmployeeMap: EntityTypeConfiguration<Employee>
    {
       public EmployeeMap()
       {
           // Primary Key
           this.HasKey(t => t.EmployeeID);

           // Properties
           this.Property(t => t.EmployeeCode)
               .HasMaxLength(8);

           this.Property(t => t.FirstName)
               .IsRequired()
               .HasMaxLength(100);

           this.Property(t => t.MiddleName)
               .HasMaxLength(100);

           this.Property(t => t.SurName)
               .IsRequired()
               .HasMaxLength(100);

           this.Property(t => t.Address)
               .HasMaxLength(400);

           this.Property(t => t.MobileNumber)
               .HasMaxLength(15);

           this.Property(t => t.AlternateMobile)
               .HasMaxLength(15);

           this.Property(t => t.CivilStatusValue)
               .HasMaxLength(20);

           this.Property(t => t.GenderValue)
               .HasMaxLength(10);

           this.Property(t => t.BloodTypeValue)
               .HasMaxLength(5);

           this.Property(t => t.ProofValue)
               .HasMaxLength(100);

           this.Property(t => t.UniqueID)
               .HasMaxLength(25);

           // Table & Column Mappings
           this.ToTable("Employees");
           this.Property(t => t.EmployeeID).HasColumnName("EmployeeID");
           this.Property(t => t.EmployeeCode).HasColumnName("EmployeeCode");
           this.Property(t => t.FirstName).HasColumnName("FirstName");
           this.Property(t => t.MiddleName).HasColumnName("MiddleName");
           this.Property(t => t.SurName).HasColumnName("SurName");
           this.Property(t => t.Address).HasColumnName("Address");
           this.Property(t => t.MobileNumber).HasColumnName("MobileNumber");
           this.Property(t => t.AlternateMobile).HasColumnName("AlternateMobile");
           this.Property(t => t.DOB).HasColumnName("DOB");
           this.Property(t => t.DOJ).HasColumnName("DOJ");
           this.Property(t => t.CivilStatus).HasColumnName("CivilStatus");
           this.Property(t => t.CivilStatusValue).HasColumnName("CivilStatusValue");
           this.Property(t => t.Gender).HasColumnName("Gender");
           this.Property(t => t.GenderValue).HasColumnName("GenderValue");
           this.Property(t => t.BloodType).HasColumnName("BloodType");
           this.Property(t => t.BloodTypeValue).HasColumnName("BloodTypeValue");
           this.Property(t => t.Proof).HasColumnName("Proof");
           this.Property(t => t.ProofValue).HasColumnName("ProofValue");
           this.Property(t => t.UniqueID).HasColumnName("UniqueID");
           this.Property(t => t.PackageAmmount).HasColumnName("PackageAmmount");
           this.Property(t => t.Experience).HasColumnName("Experience");
           this.Property(t => t.Status).HasColumnName("Status");
           this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
           this.Property(t => t.CreatedOn).HasColumnName("CreatedOn");
           this.Property(t => t.ModifiedBy).HasColumnName("ModifiedBy");
           this.Property(t => t.ModifiedOn).HasColumnName("ModifiedOn");
       }
    }
}
