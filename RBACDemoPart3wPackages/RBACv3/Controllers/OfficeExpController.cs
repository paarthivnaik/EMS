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
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: OfficeExp/Create
        public ActionResult New()
        {
            return View();
        }

        // POST: OfficeExp/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: OfficeExp/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: OfficeExp/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: OfficeExp/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: OfficeExp/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
