using Events.Entities.Models;
using Events.Repo.EventItemsTaxDetails;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace RBACv3.Controllers
{
    public class EventItemsTaxDetailsController : ApiController
    {
        private IEventItemsTaxDetailsRepo _taxRepo = new EventItemsTaxDetailsRepo();
        [HttpPost]
        public async Task<long> Save(EventItemsTaxDet obj)
        {
            obj.CreatedBy = User.Identity.GetUserId();
            var result = await _taxRepo.Save(obj);
            return result;
        }
        [HttpGet]
        public async Task<object> GetById(long eventInfoId)
        {
            var result = await _taxRepo.GetById(eventInfoId);
            return result;
        }
    }
}
