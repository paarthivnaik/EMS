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

namespace Events.Repo.VendorEventAmmountPaid
{
    public class VendorEventAmmountPaidRepo : IVendorEventAmmountPaidRepo
    {
        private VendorsContext _context;
        public  async Task<long> Save(VendorAmmountPaid obj)
        {
            try
            {
                using (_context = new VendorsContext())
                {
                    obj.CreatedOn = DateTime.Now;
                    obj.Status = true;
                    _context.Entry(obj).State = obj.VendorAmmountPaidID == 0 ? EntityState.Added : EntityState.Modified;
                    await _context.SaveChangesAsync();

                    return obj.VendorAmmountPaidID;
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

        public async Task<long> Update(VendorAmmountPaid obj)
        {
            try
            {
                using (_context = new VendorsContext())
                {
                    obj.ModifiedOn = DateTime.Now;
                 
                    _context.Entry(obj).State = EntityState.Modified;
                    _context.Entry(obj).Property(x => x.CreatedOn).IsModified = false;
                    _context.Entry(obj).Property(x => x.CreatedBy).IsModified = false;
                    _context.Entry(obj).Property(x => x.VendorEventID).IsModified = false;
                    _context.Entry(obj).Property(x => x.Status).IsModified = false;
                    await _context.SaveChangesAsync();

                    return obj.VendorAmmountPaidID;

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

        public async Task<object> GetById(long vendorEventID)
        {
            try
            {
                using (_context = new VendorsContext())
                {
                    var resObj = await _context.VendorAmmountPaids.Where(x => x.VendorEventID == vendorEventID && x.Status == true).ToListAsync();
                    return resObj;
                }
            }
            catch (Exception Ex)
            {

                return null;
            }
        }

        public async Task<List<Entities.Models.VendorAmmountPaid>> GetAll()
        {

            try
            {
                using (_context = new VendorsContext())
                {
                    var resObj = await _context.VendorAmmountPaids.Where(x => x.Status == true).ToListAsync();
                    return resObj;
                }
            }
            catch (Exception Ex)
            {

                return null;
            }
        }


        public async Task<object> GetByIdEdit(long VendorAmmountPaidID)
        {
            try
            {
                using (_context = new VendorsContext())
                {
                    var resObj = await (from a in _context.VendorAmmountPaids
                                        join b in _context.VendorEvents on a.VendorEventID equals b.VendorEventID
                                        join c in _context.Vendors on b.VendorID equals c.VendorID
                                        where a.VendorAmmountPaidID == VendorAmmountPaidID && a.Status == true
                                        select new
                                        {
                                            a.VendorAmmountPaidID,
                                            a.VendorEventID,
                                            a.PaidDate,
                                            a.AmmountPaid,
                                            a.CreatedBy,
                                            a.CreatedOn,
                                            a.ModifiedBy,
                                            a.ModifiedOn,
                                            a.Status,
                                            b.VendorID,
                                            b.EventInfoIDValue,
                                            b.EventInfoID,
                                            a.Particular,
                                            a.Description,
                                            a.BillNo
                                        }).FirstOrDefaultAsync();
                    return resObj;
                }
            }
            catch (Exception Ex)
            {

                return null;
            }
        }


        public async Task<bool> Delete(long vendorAmmountPaidId)
        {
            try
            {
                using (_context = new VendorsContext())
                {
                    var deleventEntries = new Events.Entities.Models.VendorAmmountPaid()
                    {

                        VendorAmmountPaidID = vendorAmmountPaidId,
                        Status = false,
                        VendorEventID = 1,
                         PaidDate = DateTime.Now,
                         AmmountPaid=200,
                        CreatedBy = 1,
                        CreatedOn = DateTime.Now,
                        
                    };
                    _context.VendorAmmountPaids.Attach(deleventEntries);
                    _context.Entry(deleventEntries).Property(x => x.Status).IsModified = true;
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
            catch (Exception exception)
            {

                return false;
            }
        }
    }
}
