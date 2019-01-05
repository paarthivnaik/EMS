using System;
using System.Collections.Generic;

namespace Events.Entities.Models
{
    public partial class PERMISSION
    {
        public PERMISSION()
        {
            this.ROLES = new List<ROLE>();
        }

        public int PermissionId { get; set; }
        public string PermissionDescription { get; set; }
        public virtual ICollection<ROLE> ROLES { get; set; }
    }
}
