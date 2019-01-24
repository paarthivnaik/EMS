using Events.Entities.Models;
using Events.Entities.Models.Flat;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.EventItemsRep
{
  public  class EventItemRepo:IEventItemRepo
    {

      private EventItemsContext _Context;
      public async Task<List<EventItem>> AddItemsToEvent(List<EventItem> ObjItems)
        {
            using (_Context = new EventItemsContext())
            {

                try
                {
                    foreach (EventItem obj in ObjItems)
                    {
                        if(obj.EventItemID>0)
                        {
                            obj.CreatedOn = System.DateTime.Now;
                            obj.ModifiedOn = System.DateTime.Now;
                            _Context.Entry(obj).State = EntityState.Modified;
                            _Context.Entry(obj).Property(t => t.CreatedOn).IsModified = false;
                            _Context.Entry(obj).Property(t => t.CreatedOn).IsModified = false;
                        }
                        else
                        {
                            obj.CreatedOn = System.DateTime.Now;
                            obj.ModifiedOn = null;
                            _Context.Entry(obj).State = EntityState.Added;
                        }
                        
                        await _Context.SaveChangesAsync();

                    }

                    return ObjItems;
                }
                catch (Exception ex)
                {

                    return null;
                }

            }
        }


        public async Task<object> GetById(long eventInfoId)
        {
            try
            {
                using (_Context = new EventItemsContext())
                {
                    var resObj = await _Context.EventItems.Where(x => x.EventInfoID == eventInfoId && x.Status == true).ToListAsync();       
                    return resObj;
                }
            }
            catch (Exception exception)
            {

                return null;
            }
        }

        public Task<List<EventItemsFlat>> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}
