using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RBACv3.Models
{
    public class EventsModel
    {
        public string CustomerName { get; set; }
        public string MobileNumber { get; set; }
        public string AlternateMobileNumber { get; set; }
        public string EventManager { get; set; }

        public decimal Advance { get; set; }
        public string EventEndDate { get; set; }
        public string EventStartDate { get; set; }
        public string PackageName { get; set; }

        public decimal PackagePrice { get; set; }
        public decimal TotalCost { get; set; }
        public string Venue { get; set; }
       
    }
}