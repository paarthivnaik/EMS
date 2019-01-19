using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.VendorsRep
{
   public class VendorRepo:IVendorRepo
    {
       private VendorsContext _context;
        public async Task<string[]> Save(Entities.Models.Vendor obj)
        {
            try
            {
                using (_context = new VendorsContext())
                {
                    obj.CreatedOn = DateTime.Now;
                    obj.Status = true;
                    _context.Entry(obj).State = obj.VendorID == 0 ? EntityState.Added : EntityState.Modified;
                    await _context.SaveChangesAsync();
                    string[] res = new string[2];
                    res[0] = obj.VendorID.ToString();
                    res[1] = obj.VendorCode;
                    return res;
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
                return null;
            }
            catch (Exception Ex)
            {
                return null;
            }
        }

        public async  Task<string[]> Update(Entities.Models.Vendor obj)
        {
            try
            {
                using (_context = new VendorsContext())
                {
                    obj.ModifiedOn = DateTime.Now;
                    _context.Entry(obj).Property(x => x.CreatedOn).IsModified = false;
                    _context.Entry(obj).Property(x => x.CreatedBy).IsModified = false;
                    _context.Entry(obj).Property(x => x.Status).IsModified = false;
                    _context.Entry(obj).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    string[] res = new string[2];
                    res[0] = obj.VendorID.ToString();
                    res[1] = obj.VendorCode;
                    return res;

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
                return null;
            }
            catch (Exception exception)
            {

                return null;
            }
        }

        public async Task<object> GetById(long vendorId)
        {
            try
            {
                using (_context = new VendorsContext())
                {
                    var resObj = await _context.Vendors.Where(x => x.VendorID == vendorId && x.Status == true).FirstOrDefaultAsync();
                    return resObj;
                }
            }
            catch (Exception Ex)
            {

                return null;
            }
        }

        public Task<object> GetByEmpId(long vendorId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Entities.Models.Vendor>> GetAll()
        {
            try
            {
                using (_context = new VendorsContext())
                {
                    var resObj = await _context.Vendors.Where(x => x.Status == true).ToListAsync();
                    return resObj;
                }
            }
            catch (Exception exception)
            {

                return null;
            }
        }

        public Task<bool> Delete(long vendorId)
        {
            throw new NotImplementedException();
        }


        public async Task<object> GetReport(string vendorCode)
        {
            try
            {
                using (_context = new VendorsContext())
                {
                    var resObj = await _context.Vendors.Where(x => x.Status == true && x.VendorCode == vendorCode).ToListAsync();

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
