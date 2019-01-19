using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models
{
   public class EventItem
    {
        public long EventItemID { get; set; }
        public long EventInfoID { get; set; }
        public long CategoryID { get; set; }
        public string CategoryValue { get; set; }
        public long ItemID { get; set; }
        public string ItemValue { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
        public bool Status { get; set; }
    }
}
