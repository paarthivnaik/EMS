using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RBACv3.Controllers
{
    public class EventsController : Controller
    {
        // GET: Events
        public ActionResult Manage()
        {
            return View();
        }

        // GET: Events/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Events/Create
        public ActionResult Create()
        {
            return View();
        }

       

        // GET: Events/Edit/5
        public ActionResult Edit(int keyId)
        {
            return View();
        }

        
        // GET: Events/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // GET: Events/Delete/5
        public ActionResult AddItems(int keyId)
        {
            return View();
        }
        // GET: Events/Delete/5
        public ActionResult EventItemDetails(int keyId)
        {
            ViewBag.eventInfoId = keyId;
            return PartialView("_EventItemDetails");
        }
    }
}
