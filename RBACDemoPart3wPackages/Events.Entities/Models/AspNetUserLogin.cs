using System;
using System.Collections.Generic;

namespace Events.Entities.Models
{
    public partial class AspNetUserLogin
    {
        public string LoginProvider { get; set; }
        public string ProviderKey { get; set; }
        public int UserId { get; set; }
        public virtual USER USER { get; set; }
    }
}
