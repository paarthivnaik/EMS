using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models
{
   public class Employee
    {
        public long EmployeeID { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public string EmployeeCode { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string SurName { get; set; }
        public string Address { get; set; }
        public string MobileNumber { get; set; }
        public string AlternateMobile { get; set; }
        public Nullable<System.DateTime> DOB { get; set; }
        public Nullable<System.DateTime> DOJ { get; set; }
        public long CivilStatus { get; set; }
        public string CivilStatusValue { get; set; }
        public long Gender { get; set; }
        public string GenderValue { get; set; }
        public Nullable<long> BloodType { get; set; }
        public string BloodTypeValue { get; set; }
        public Nullable<long> Proof { get; set; }
        public string ProofValue { get; set; }
        public string UniqueID { get; set; }
        public decimal PackageAmmount { get; set; }
        public int Experience { get; set; }
        public Nullable<bool> Status { get; set; }
        public long CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public Nullable<long> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
    }
}
