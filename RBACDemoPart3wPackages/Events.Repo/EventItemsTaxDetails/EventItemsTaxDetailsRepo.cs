using Events.Entities.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.EventItemsTaxDetails
{
    public class EventItemsTaxDetailsRepo:IEventItemsTaxDetailsRepo
    {
        private EventItemsTaxContext _context;
        public async Task<long> Save(EventItemsTaxDet obj)
        {
            try
            {
                using(_context=new EventItemsTaxContext())
                {
                  
                    if (obj.EventItemsTaxDetId==0)
                    {
                        obj.CreatedOn = DateTime.Now;
                        _context.Entry(obj).State = EntityState.Added;
                    }
                    else
                    {
                        _context.Entry(obj).State = EntityState.Modified;
                        obj.ModifiedOn = DateTime.Now;
                        _context.Entry(obj).Property(x => x.CreatedOn).IsModified = false;
                        _context.Entry(obj).Property(x => x.CreatedBy).IsModified = false;
                        
                    }
                    //_context.Entry(obj).State = obj.EventItemsTaxDetId == 0 ? EntityState.Added : EntityState.Modified;
                    await _context.SaveChangesAsync();

                    return obj.EventItemsTaxDetId;
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
                return 0;
            }
            catch(Exception Ex)
            {
                return 0;
            }
        }

        public async Task<object> GetById(long eventInfoId)
        {
            try
            {
                using (_context = new EventItemsTaxContext())
                {
                    var resObj = await _context.EventItemsTaxDets.Where(x => x.EventInfoID == eventInfoId).FirstOrDefaultAsync();
                    return resObj;
                }
            }
            catch (Exception Ex)
            {

                return null;
            }
        }
    }
}
