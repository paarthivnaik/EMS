using Events.Entities.Models;
using Events.Entities.Models.Flat;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Diagnostics;
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


        public async Task<bool> Delete(long eventItemId)
        {
            try
            {
                using (_Context = new EventItemsContext())
                {
                    var delItemsEntries = new Events.Entities.Models.EventItem()
                    {

                        EventItemID = eventItemId,
                        Status = false,
                        CategoryID = 0,
                        CategoryValue = "System",
                        CreatedBy = 1,
                        CreatedOn = DateTime.Now,
                        Quantity = 0,
                         Price=0
                    };
                    _Context.EventItems.Attach(delItemsEntries);
                    _Context.Entry(delItemsEntries).Property(x => x.Status).IsModified = true;
                    await _Context.SaveChangesAsync();
                    return true;
                }
            }
            catch (DbEntityValidationException dbEx)
            {
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        Trace.TraceInformation("Property: {0} Error: {1}",
                                                validationError.PropertyName,
                                                validationError.ErrorMessage);
                    }
                }
                return false;
            }
            catch (Exception exception)
            {

                return false;
            }
        }


        public  async Task<object> GetItemDet(long eventInfoId)
        {
            try
            {
                using (_Context = new EventItemsContext())
                {
                    var resObj = await (from a in _Context.EventInfos
                                        where a.EventInfoID == eventInfoId && a.Status == true
                                        select new
                                        {
                                            EventRefID = a.EventRefID,
                                            CustomerName = a.CustomerName,
                                            EventTypeValue = a.EventTypeValue,
                                            MobileNo = a.MobileNo,
                                            EventStartDate = a.EventStartDate,
                                            EventEndDate = a.EventEndDate,
                                            Venue = a.Venue,
                                            EventItems = _Context.EventItems.Where(x => x.EventInfoID == eventInfoId && x.Status == true).ToList(),
                                            EventTax = _Context.EventItemsTaxDets.Where(x => x.EventInfoID == eventInfoId).FirstOrDefault()

                                        }).FirstOrDefaultAsync();
                    return resObj;
                }
            }
            catch (Exception exception)
            {

                return null;
            }
        }
    }
}
