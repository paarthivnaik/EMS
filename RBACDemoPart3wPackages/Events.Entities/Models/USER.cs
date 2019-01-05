using System;
using System.Collections.Generic;

namespace Events.Entities.Models
{
    public partial class USER
    {
        public USER()
        {
            this.AspNetUserClaims = new List<AspNetUserClaim>();
            this.AspNetUserLogins = new List<AspNetUserLogin>();
            this.ROLES = new List<ROLE>();
        }

        public int UserId { get; set; }
        public System.DateTime LastModified { get; set; }
        public bool Inactive { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string PasswordHash { get; set; }
        public string SecurityStamp { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public Nullable<System.DateTime> LockoutEndDateUtc { get; set; }
        public bool LockoutEnabled { get; set; }
        public int AccessFailedCount { get; set; }
        public string UserName { get; set; }
        public virtual ICollection<AspNetUserClaim> AspNetUserClaims { get; set; }
        public virtual ICollection<AspNetUserLogin> AspNetUserLogins { get; set; }
        public virtual ICollection<ROLE> ROLES { get; set; }
    }
}
