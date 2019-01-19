﻿using Events.Entities.Models;
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
                    _context.Entry(obj).Property(x => x.CreatedOn).IsModified = false;
                    _context.Entry(obj).Property(x => x.CreatedBy).IsModified = false;
                    _context.Entry(obj).Property(x => x.VendorEventID).IsModified = false;
                    _context.Entry(obj).Property(x => x.Status).IsModified = false;
                    _context.Entry(obj).State = EntityState.Modified;
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
    }
}
