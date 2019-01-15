using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models
{
   public class VendorEvent
    {
        public long VendorEventID { get; set; }
        public long VendorID { get; set; }
        public long EventInfoID { get; set; }
        public decimal Ammmount { get; set; }
        public System.DateTime ProgramDate { get; set; }
        public System.DateTime ConfirmationDate { get; set; }
        public bool Status { get; set; }
        public long CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public Nullable<long> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
    }
}
