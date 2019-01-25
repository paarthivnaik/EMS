using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models.Flat
{
   public class EventItemsTaxDetFlat
    {
        public long EventItemsTaxDetId { get; set; }
        public Nullable<long> EventInfoID { get; set; }
        public decimal Subtotal { get; set; }
        public Nullable<decimal> tax { get; set; }
        public Nullable<decimal> TaxAmount { get; set; }
        public decimal GrandTotal { get; set; }
    }
}
