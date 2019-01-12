using RBACv3.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RBACv3.Controllers
{
    public class OfficeExpController : Controller
    {
        // GET: OfficeExp
        public ActionResult Index()
        {
            return View();
        }

        // GET: OfficeExp/Details/5
        public ActionResult Details()
        {
            return View();
        }

        // GET: OfficeExp/Create
        public ActionResult New()
        {
            return View();
        }


        
        // GET: OfficeExp/Edit/5
        public ActionResult Edit(int keyId)
        {
           // @ViewBag.ExpenseId = id;
            return View();
        }

        



        // POST: OfficeExp/Delete/5
        public object Delete(int keyId)
        {
            try
            {
                var obj = new MultiDelete();
                var res = obj.Delete("/api/OfficeExpData/Delete?incidentInfoID=" + keyId);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
