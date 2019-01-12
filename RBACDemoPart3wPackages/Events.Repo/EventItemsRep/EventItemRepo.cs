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
        public async Task<bool> AddItemsToEvent(List<EventItemsFlat> ObjItems)
        {
            using (_Context = new EventItemsContext())
            {

                try
                {
                    foreach (EventItemsFlat obj in ObjItems)
                    {
                        EventItem Objfinal = new EventItem()
                        {
                            EventItemID = obj.EventItemID,
                            EventInfoID = obj.EventInfoID,
                            CategoryID = obj.CategoryID,
                            CategoryValue = obj.CategoryValue,
                            ItemID = obj.ItemID,
                            ItemValue = obj.ItemValue,
                            Quantity = obj.Quantity,
                            Price = obj.Price,
                            CreatedBy = obj.CreatedBy,
                            CreatedOn = obj.CreatedOn,
                            ModifiedBy = obj.ModifiedBy,
                            ModifiedOn = obj.ModifiedOn,
                            Status = obj.Status


                        };
                        _Context.Entry(Objfinal).State = EntityState.Added;
                        await _Context.SaveChangesAsync();

                    }

                    return true;
                }
                catch (Exception ex)
                {

                    return false;
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
