using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RBACv3.Controllers
{
    public class ListEntryListValuesController : Controller
    {
        // GET: ListEntryListValues
        public ActionResult Index()
        {
            return View();
        }

        // GET: ListEntryListValues/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ListEntryListValues/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ListEntryListValues/Create
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

        // GET: ListEntryListValues/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: ListEntryListValues/Edit/5
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

        // GET: ListEntryListValues/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: ListEntryListValues/Delete/5
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
