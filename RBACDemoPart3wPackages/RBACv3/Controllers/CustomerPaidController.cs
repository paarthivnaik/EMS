using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RBACv3.Controllers
{
    public class CustomerPaidController : Controller
    {
        // GET: CustomerPaid
        public ActionResult New(long keyId)
        {
            ViewBag.custPaidId = keyId;
            return PartialView("_New");
        }
        public ActionResult Edit(long custPaidId)
        {
            ViewBag.custPaidId = custPaidId;
            return PartialView("_Edit");
        }
        public ActionResult CustInvoice(long keyId)
        {
            ViewBag.custPaidId = keyId;
            return PartialView("_CustInvoice");
        }
    }
}