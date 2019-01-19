using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models
{
   public class Vendor
    {
        public long VendorID { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public string VendorCode { get; set; }
        public string FirstName { get; set; }
        public string Organization { get; set; }
        public string LastName { get; set; }
        public string SurName { get; set; }
        public string MobileNo { get; set; }
        public string AlternateMobileNo { get; set; }
        public string Address { get; set; }
        public Nullable<long> Proof { get; set; }
        public string ProofValue { get; set; }
        public bool Status { get; set; }
        public long CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public Nullable<long> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
        public string UniqueID { get; set; }
    }
}
