using RBACv3.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RBACv3.Controllers
{
     [Authorize]
    public class EventsDataController : ApiController
    {
        [HttpPost]
        public object Save(EventsModel obj)
        {
            return obj;
        }
    }
}
