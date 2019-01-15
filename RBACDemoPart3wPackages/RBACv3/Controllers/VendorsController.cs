using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RBACv3.Controllers
{
    public class VendorsController : Controller
    {
        // GET: Vendors
        public ActionResult Manage()
        {
            return View();
        }
        public ActionResult New()
        {
            return View();
        }
        public ActionResult Edit(long keyId)
        {
            return View();
        }
        public ActionResult Delete(long keyId)
        {
            return View();
        }
    }
}