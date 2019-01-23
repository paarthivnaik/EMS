using Events.Entities.Models;
using Events.Entities.Models.Flat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.EventItemsRep
{
   public interface IEventItemRepo
    {
       Task<List<EventItem>> AddItemsToEvent(List<EventItem> ObjItems);
       Task<object> GetById(long eventInfoId);
       Task<List<EventItemsFlat>> GetAll();
    }
}
