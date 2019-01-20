using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RBACv3.Controllers
{
    public class VendorEventsController : Controller
    {
        // GET: VendorEvents
        
        public ActionResult Manage()
        {
            return View();
        }
        public ActionResult New()
        {
            return PartialView("_New");
        }
        public ActionResult Edit(long? KeyId)
        {
            ViewBag.vendorEventId = KeyId;
            return PartialView("_Edit");
        }
    }
}