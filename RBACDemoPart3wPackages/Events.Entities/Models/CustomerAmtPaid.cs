using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models
{
  public  class CustomerAmtPaid
    {
        public long CustomerAmtPaidID { get; set; }
      [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public string CustomerAmtPaidRefID { get; set; }
        public Nullable<long> EventInfoID { get; set; }
        public decimal Ammount { get; set; }
        public System.DateTime DateOfPaid { get; set; }
        public long CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public Nullable<long> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
        public bool Status { get; set; }
        public string Description { get; set; }
    }
}
