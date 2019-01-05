using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Events.Entities.Models
{
    public partial class EventInfo
    {
        public long EventInfoID { get; set; }
         [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public string EventRefID { get; set; }
        public string CustomerName { get; set; }
        public string MobileNo { get; set; }
        public string AlternateMobileNo { get; set; }
        public long EventType { get; set; }
        public string EventTypeValue { get; set; }
        public Nullable<System.DateTime> EventStartDate { get; set; }
        public Nullable<System.DateTime> EventEndDate { get; set; }
        public Nullable<long> Package { get; set; }
        public string PackageValue { get; set; }
        public string Venue { get; set; }
        public string Manager { get; set; }
        public string ManagerMobile { get; set; }
        public Nullable<decimal> PackagePrice { get; set; }
        public Nullable<decimal> TotalPrice { get; set; }
        public Nullable<decimal> AdvancePrice { get; set; }
        public long CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public Nullable<long> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
        public bool Status { get; set; }
    }
}
