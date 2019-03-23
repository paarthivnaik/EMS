using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RBACv3.Controllers
{
    public class SalariesController : Controller
    {
        // GET: Salaries
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
            ViewBag.SalaryPaidId = keyId;
            return PartialView("_Edit");
        }
        public ActionResult Details()
        {
            return View();
        }
    }
}