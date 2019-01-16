using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RBACv3.Controllers
{
    public class VendorPaidController : Controller
    {
        // GET: VendorPaid
        public ActionResult New(long? keyId)
        {
            return View();
        }
    }
}