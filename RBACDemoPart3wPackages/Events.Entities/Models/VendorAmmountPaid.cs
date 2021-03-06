﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models
{
  public  class VendorAmmountPaid
    {
        public long VendorAmmountPaidID { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public string BillNo { get; set; }
        public string Particular { get; set; }
        public string Description { get; set; }
        public long VendorEventID { get; set; }
        public decimal AmmountPaid { get; set; }
        public System.DateTime PaidDate { get; set; }
        public bool Status { get; set; }
        public long CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public Nullable<long> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
    }
}
