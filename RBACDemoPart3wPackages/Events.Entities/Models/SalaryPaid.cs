using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models
{
   public class SalaryPaid
    {
        public long SalaryPaidID { get; set; }
        public string EmployeeCode { get; set; }
        public Nullable<long> EmployeeID { get; set; }
        public System.DateTime PaidMonth { get; set; }
        public decimal Salary { get; set; }
        public Nullable<decimal> Incentives { get; set; }
        public Nullable<decimal> Bonous { get; set; }
        public bool Status { get; set; }
        public long CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public Nullable<long> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
        public string Description { get; set; }
    }
}
