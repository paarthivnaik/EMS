using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models
{
  public  class EmployeeLeave
    {
        public long EmployeeLeaveID { get; set; }
        public Nullable<long> EmployeeID { get; set; }
        public System.DateTime FromDate { get; set; }
        public System.DateTime ToDate { get; set; }
        public long LeaveID { get; set; }
        public string LeaveValue { get; set; }
        public int NoOfDays { get; set; }
        public string Comments { get; set; }
        public bool Status { get; set; }
        public long CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public Nullable<long> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
    }
}
