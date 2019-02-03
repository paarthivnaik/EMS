using Events.Entities.Models;
using Events.Repo.EventsRepo;
using RBACv3.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace RBACv3.Controllers
{

    public class EventsDataController : ApiController
    {
         private IEventsRepo _eventRepo = new EventsRepo();
        [HttpPost]
         public async Task<Tuple<long, string>> Save(EventInfo obj)
        {
            obj.CreatedBy = User.Identity.GetUserId();
            var result = await _eventRepo.Save(obj);
            return result;
        }
         [HttpPost]
         public async Task<long>Update(EventInfo obj)
        {
            obj.ModifiedBy = User.Identity.GetUserId();
            var result = await _eventRepo.Update(obj);
            return result;
        }
         [HttpGet]
         public async Task<EventInfo> GetById(long eventInfoId)
         {
             var result = await _eventRepo.GetById(eventInfoId);
             return result;
         }

         [HttpGet]
         public async Task<List<EventInfo>> GetAll()
         {
             var result = await _eventRepo.GetAll();
             return result;
         }
       [HttpGet]
         public async Task<bool> Delete(int eventInfoId)
         {
             return await _eventRepo.Delete(eventInfoId);
         }
        
    }
}
