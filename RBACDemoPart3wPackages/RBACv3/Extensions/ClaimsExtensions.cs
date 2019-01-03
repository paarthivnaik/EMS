﻿using System.Linq;
using System.Security.Claims;
using System.Security.Principal;

namespace RBACv3.Extensions
{
    public static class ClaimsExtensions
    {
        static string GetUserEmail(this ClaimsIdentity identity)
        {
            return identity.Claims?identity.Claims.FirstOrDefault(c => c.Type == "WebApplication.Models.RegisterViewModel.Email")!=null?identity.Claims.FirstOrDefault(c => c.Type == "WebApplication.Models.RegisterViewModel.Email").Value:null:null;
        }

        public static string GetUserEmail(this IIdentity identity)
        {
            var claimsIdentity = identity as ClaimsIdentity;
            return claimsIdentity != null ? GetUserEmail(claimsIdentity) : "";
        }

        static string GetUserNameIdentifier(this ClaimsIdentity identity)
        {
            return identity.Claims?identity.Claims.FirstOrDefault(c => c.Type == "WebApplication.Models.RegisterViewModel.NameIdentifier")!=null?identity.Claims.FirstOrDefault(c => c.Type == "WebApplication.Models.RegisterViewModel.NameIdentifier").Value:null:null;
        }

        public static string GetUserNameIdentifier(this IIdentity identity)
        {
            var claimsIdentity = identity as ClaimsIdentity;
            return claimsIdentity != null ? GetUserNameIdentifier(claimsIdentity) : "";
        }
    }
}