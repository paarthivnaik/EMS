using Events.Entities.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.EventsRepo
{
    public class EventsRepo : IEventsRepo
    {
        private EventsContext _context;
        public async Task<long> Save(Events.Entities.Models.EventInfo obj)
        {
            using (_context = new EventsContext())
            {
                try
                {

                    obj.CreatedOn = DateTime.Now;
                    obj.Status = true;
                    _context.Entry(obj).State = obj.EventInfoID == 0 ? EntityState.Added : EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return obj.EventInfoID;

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
                catch (Exception exception)
                {

                    return 0;
                }
            }
        }

        public async Task<long> Update(Events.Entities.Models.EventInfo obj)
        {
            using (_context = new EventsContext())
            {
                try
                {

                    obj.ModifiedOn = DateTime.Now;
                    _context.Entry(obj).Property(x => x.CreatedOn).IsModified = false;
                    _context.Entry(obj).Property(x => x.CreatedBy).IsModified = false;
                    _context.Entry(obj).Property(x => x.Status).IsModified = false;
                    _context.Entry(obj).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return obj.EventInfoID;
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
                catch (Exception exception)
                {

                    return 0;
                }
            }
        }

        public async Task<Events.Entities.Models.EventInfo> GetById(long eventInfoId)
        {
            try
            {
                using (_context = new EventsContext())
                {
                    var resObj = await _context.EventInfos.Where(x => x.EventInfoID == eventInfoId && x.Status == true).FirstOrDefaultAsync();
                    return resObj;
                }
            }
            catch (Exception exception)
            {

                return null;
            }

        }

        public async Task<List<Events.Entities.Models.EventInfo>> GetAll()
        {
            try
            {
                using (_context = new EventsContext())
                {
                    var resObj = await _context.EventInfos.Where(x => x.Status == true).ToListAsync();
                    return resObj;
                }
            }
            catch (Exception exception)
            {

                return null;
            }

        }

        public Task<bool> Delete(long eventInfoId)
        {
            throw new NotImplementedException();
        }
    }
}
