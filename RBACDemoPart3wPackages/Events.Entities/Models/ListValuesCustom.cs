using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models
{
  public  class ListValuesCustom
    {
        public long ListValueID { get; set; }
        public long ListEntryID { get; set; }
        public string ListValueName { get; set; }
        public string EntryType { get; set; }
        public bool Status { get; set; }
        public long CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public Nullable<long> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedOn { get; set; }
        public virtual ListEntriesCustom ListEntriesCustoms { get; set; }
    }
}
