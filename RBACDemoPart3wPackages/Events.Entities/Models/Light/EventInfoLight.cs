using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Entities.Models.Light
{
  public  class EventInfoLight
    {
        public long EventInfoID { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public string EventRefID { get; set; }
        public string CustomerName { get; set; }
        public string MobileNo { get; set; }
        public string AlternateMobileNo { get; set; }
        public long EventType { get; set; }
        public string EventTypeValue { get; set; }
        public bool Status { get; set; }
    }
}
