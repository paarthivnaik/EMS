using Events.Entities.Models;
using Events.Repo.VendorsRep;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.VendorEventsRep
{
    public class VendorEventsRepo : IVendorEventsRepo
    {
        private VendorsContext _context;
        public async Task<long> Save(VendorEvent obj)
        {
            try
            {
                using (_context = new VendorsContext())
                {
                    obj.CreatedOn = DateTime.Now;
                    obj.Status = true;
                    _context.Entry(obj).State = obj.VendorEventID == 0 ? EntityState.Added : EntityState.Modified;
                    await _context.SaveChangesAsync();

                    return obj.VendorEventID;
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
            catch (Exception Ex)
            {
                return 0;
            }
        }
        public async Task<long> Update(VendorEvent obj)
        {
            try
            {
                using (_context = new VendorsContext())
                {
                    obj.ModifiedOn = DateTime.Now;
                    _context.Entry(obj).Property(x => x.CreatedOn).IsModified = false;
                    _context.Entry(obj).Property(x => x.CreatedBy).IsModified = false;
                    _context.Entry(obj).Property(x => x.EventInfoID).IsModified = false;
                    _context.Entry(obj).Property(x => x.EventInfoIDValue).IsModified = false;
                    _context.Entry(obj).Property(x => x.Status).IsModified = false;
                    _context.Entry(obj).State = EntityState.Modified;
                    await _context.SaveChangesAsync();

                    return obj.VendorEventID;

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
            catch (Exception Ex)
            {

                return 0;
            }
        }
        public async Task<object> GetById(long vendorId)
        {
            try
            {
                using (_context = new VendorsContext())
                {
                    var resObj = await _context.VendorEvents.Where(x => x.VendorID == vendorId && x.Status == true).ToListAsync();
                    return resObj;
                }
            }
            catch (Exception Ex)
            {

                return null;
            }
        }
        public async Task<List<VendorEvent>> GetAll()
        {
            try
            {
                using (_context = new VendorsContext())
                {
                    var resObj = await _context.VendorEvents.Where(x => x.Status == true).ToListAsync();
                    return resObj;
                }
            }
            catch (Exception Ex)
            {

                return null;
            }
        }
        public async Task<bool> Delete(long vendorEventId)
        {
            try
            {
                using (_context = new VendorsContext())
                {
                    var delSalEntries = new Events.Entities.Models.VendorEvent()
                    {

                        VendorEventID = vendorEventId,
                        Status = false,
                        CreatedBy = 1,
                        CreatedOn = DateTime.Now
                    };
                    _context.VendorEvents.Attach(delSalEntries);
                    _context.Entry(delSalEntries).Property(x => x.Status).IsModified = true;
                    await _context.SaveChangesAsync();
                    return true;
                }
            }
            catch (Exception Ex)
            {

                return false;
            }
        }
        public async Task<object> GetReport(DateTime fromdate, DateTime todate)
        {
            try
            {
                using (_context = new VendorsContext())
                {
                    var resObj = await _context.VendorEvents.Where(x => x.Status == true && x.ProgramDate >= fromdate && x.ProgramDate <= todate).ToListAsync();

                    return resObj;
                }
            }
            catch (Exception Ex)
            {

                return null;
            }
        }
        public async Task<object> GetReport(string EventCode)
        {
            try
            {
                using (_context = new VendorsContext())
                {
                    var resObj = await _context.VendorEvents.Where(x => x.Status == true && x.EventInfoIDValue == EventCode).ToListAsync();

                    return resObj;
                }
            }
            catch (Exception Ex)
            {

                return null;
            }
        }


        public async Task<object> GetByEventId(long eventId)
        {

            try
            {
                using (_context = new VendorsContext())
                {
                    //var resObj = await _context.VendorEvents.Where(x => x.VendorEventID == eventId && x.Status == true).FirstOrDefaultAsync();
                    var resObj = await (from a in _context.VendorEvents
                                  join b in _context.Vendors on a.VendorID equals b.VendorID
                                  where a.VendorEventID == eventId && a.Status == true
                                  select new
                                  {
                                      a.VendorEventID,
                                      a.VendorID,
                                      a.EventInfoIDValue,
                                      a.EventInfoID,
                                      a.ProgramDate,
                                      a.Ammmount,
                                      a.CreatedBy,
                                      a.CreatedOn,
                                      a.ModifiedBy,
                                      a.ModifiedOn,
                                      a.Status
                                      
                                  }).FirstOrDefaultAsync();
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
