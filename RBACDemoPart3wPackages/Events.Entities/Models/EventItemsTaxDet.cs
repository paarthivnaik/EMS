using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models
{
   public class EventItemsTaxDet
    {
        public long EventItemsTaxDetId { get; set; }
        public Nullable<long> EventInfoID { get; set; }
        public decimal Subtotal { get; set; }
        public Nullable<decimal> tax { get; set; }
        public Nullable<decimal> TaxAmount { get; set; }
        public decimal GrandTotal { get; set; }
        public long CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public Nullable<long> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
    }
}
