using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models
{
  public  class Expens
    {
        public long ExpenseID { get; set; }
       [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public string ExpenseRefID { get; set; }
        public long Particular { get; set; }
        public string ParticularValue { get; set; }
        public string BillRefNo { get; set; }
        public decimal Ammount { get; set; }
        public System.DateTime SubmissionDate { get; set; }
        public string Description { get; set; }
        public long CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public Nullable<long> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
        public bool Status { get; set; }
    }
}
