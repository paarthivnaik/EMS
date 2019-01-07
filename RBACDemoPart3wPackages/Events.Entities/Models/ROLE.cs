using System;
using System.Collections.Generic;

namespace Events.Entities.Models
{
    public partial class ROLE
    {
        public ROLE()
        {
            this.PERMISSIONS = new List<PERMISSION>();
            this.USERS = new List<USER>();
        }

        public int RoleId { get; set; }
        public System.DateTime LastModified { get; set; }
        public bool IsSysAdmin { get; set; }
        public string RoleDescription { get; set; }
        public string Name { get; set; }
        public virtual ICollection<PERMISSION> PERMISSIONS { get; set; }
        public virtual ICollection<USER> USERS { get; set; }
    }
}
