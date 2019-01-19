using Events.Entities.Models.Flat;
using Events.Repo.EventItemsRep;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace RBACv3.Controllers
{
    public class EventItemsDataController : ApiController
    {
        IEventItemRepo _repo = new EventItemRepo();
        [HttpPost]
        public async Task<bool> AddItemsToEvent(List<EventItemsFlat> ObjItems)
        {
            return await _repo.AddItemsToEvent(ObjItems);
        }
        [HttpPost]
        public async Task<object> GetById(long eventInfoId)
        {
            var result = await _repo.GetById(eventInfoId);
            return result;
        }
        
    }
}
