using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.CustomerAmtPaid
{
  public  class CustomerAmtPaidRep:ICustomerAmtPaidRep
    {
      private CustomerAmtPaidContext _context;
        public async Task<long> Save(Entities.Models.CustomerAmtPaid obj)
        {
            try
            {
                using (_context = new CustomerAmtPaidContext())
                {
                    obj.CreatedOn = DateTime.Now;
                    obj.Status = true;
                    _context.Entry(obj).State = obj.CustomerAmtPaidID == 0 ? EntityState.Added : EntityState.Modified;
                    await _context.SaveChangesAsync();
                   
                    return obj.CustomerAmtPaidID;
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

        public async Task<long> Update(Entities.Models.CustomerAmtPaid obj)
        {
            try
            {
                using (_context = new CustomerAmtPaidContext())
                {
                    obj.ModifiedOn = DateTime.Now;
                    _context.Entry(obj).State = EntityState.Modified;
                    _context.Entry(obj).Property(x => x.CreatedOn).IsModified = false;
                    _context.Entry(obj).Property(x => x.CreatedBy).IsModified = false;
                    _context.Entry(obj).Property(x => x.Status).IsModified = false;
                    await _context.SaveChangesAsync();

                    return obj.CustomerAmtPaidID;
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

        public  async Task<object> GetById(long CustomerAmtPaidId)
        {
            try
            {
                using (_context = new CustomerAmtPaidContext())
                {
                    //var resObj = await _context.CustomerAmtPaids.Where(x => x.CustomerAmtPaidID == CustomerAmtPaidId && x.Status == true).FirstOrDefaultAsync();
                    var resObj = await (from a in _context.CustomerAmtPaids
                                        join b in _context.EventInfoLights on a.EventInfoID equals b.EventInfoID
                                        where a.CustomerAmtPaidID == CustomerAmtPaidId && a.Status == true
                                        select new
                                        {
                                            a.CustomerAmtPaidID,
                                            a.CustomerAmtPaidRefID,
                                            a.Ammount,
                                            a.DateOfPaid,
                                            a.Description,
                                            a.EventInfoID,
                                            b.CustomerName,
                                            b.EventTypeValue,
                                            b.MobileNo,
                                            b.EventRefID,
                                            a.Particular
                                        }).FirstOrDefaultAsync();

                    return resObj;
                }
            }
            catch (Exception Ex)
            {

                return null;
            }
        }

        public async  Task<object> GetAll(long eventInfoId)
        {
            try
            {
                using (_context = new CustomerAmtPaidContext())
                {
                    var resObj = await _context.CustomerAmtPaids.Where(x => x.EventInfoID == eventInfoId && x.Status == true).ToListAsync();
                    return resObj;
                }
            }
            catch (Exception Ex)
            {

                return null;
            }
        }

        public async Task<bool> Delete(long CustomerAmtPaidId)
        {
            try
            {
                using (_context = new CustomerAmtPaidContext())
                {
                    var delcustEntries = new Events.Entities.Models.CustomerAmtPaid()
                    {

                         CustomerAmtPaidID = CustomerAmtPaidId,
                        Status = false,
                       Ammount=0,
                        CreatedBy = 1,
                        CreatedOn = DateTime.Now,
                        
                    };
                    _context.CustomerAmtPaids.Attach(delcustEntries);
                    _context.Entry(delcustEntries).Property(x => x.Status).IsModified = true;
                    await _context.SaveChangesAsync();
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
            catch (Exception Ex)
            {

                return false;
            }
        }
    }
}
