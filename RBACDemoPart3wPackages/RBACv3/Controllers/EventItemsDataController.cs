using Events.Entities.Models;
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
        public async Task<List<EventItem>> AddItemsToEvent(List<EventItem> ObjItems)
        {
            return await _repo.AddItemsToEvent(ObjItems);
        }
        [HttpGet]
        public async Task<object> GetById(long eventInfoId)
        {
            var result = await _repo.GetById(eventInfoId);
            return result;
        }
        [HttpGet]
        public async Task<bool> Delete(long eventItemId)
        {
            var result = await _repo.Delete(eventItemId);
            return result;
        }
        [HttpGet]
        public async Task<object> GetItemDet(long eventInfoId)
        {
            var result = await _repo.GetItemDet(eventInfoId);
            return result;
        }
        
    }
}
