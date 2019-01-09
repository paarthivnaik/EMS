using Events.Entities.Models;
using Events.Entities.Models.Flat;
using Events.Repo.ListEntryRep;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.ListValueRep
{
   public class ListValueRepo:IListValueRepo
    {
       private ListEntryContext _context;
        public async  Task<long> Save(ListValue obj)
        {
            using (_context = new ListEntryContext())
            {
                try
                {
                    if (!_context.ListValues.Any(m => m.ListValueName == obj.ListValueName && m.ListValueID == obj.ListValueID && m.Status == true))
                    {
                        obj.CreatedOn = DateTime.Now;
                        obj.Status = true;
                        _context.Entry(obj).State = obj.ListValueID == 0 ? EntityState.Added : EntityState.Modified;
                        await _context.SaveChangesAsync();
                        return obj.ListValueID;
                    }
                    else
                    {
                        return 0;
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
                catch (Exception exception)
                {

                    return 0;
                }
            }
        }

        public async Task<long> Update(ListValue obj)
        {
            using (_context = new ListEntryContext())
            {
                try
                {
                    if (!_context.ListValues.Any(m => m.ListValueName == obj.ListValueName && m.ListValueID == obj.ListValueID && m.Status == true))
                    {
                        obj.ModifiedOn = DateTime.Now;
                        _context.Entry(obj).Property(x => x.CreatedOn).IsModified = false;
                        _context.Entry(obj).Property(x => x.CreatedBy).IsModified = false;
                        _context.Entry(obj).Property(x => x.Status).IsModified = false;
                        _context.Entry(obj).State = obj.ListValueID == 0 ? EntityState.Added : EntityState.Modified;
                        await _context.SaveChangesAsync();
                        return obj.ListValueID;
                    }
                    else
                    {
                        return 0;
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
                catch (Exception exception)
                {

                    return 0;
                }
            }
        }

        public  object GetById(long listentryId)
        {
            try
            {
                using (_context = new ListEntryContext())
                {
                    var resObj = _context.ListValues.Where(x => x.ListEntryID == listentryId && x.Status == true).ToList();
                 var jsondata  = new { Result = "OK", Records = resObj };
                 return jsondata;
                }
            }
            catch (Exception exception)
            {

                return null;
            }
        }

        public async Task<object> GetAll()
        {

            try
            {
                using (_context = new ListEntryContext())
                {
                    var resObj = await _context.ListEntrys.Where(x => x.Status == true).ToListAsync();
                    return resObj;
                }
            }
            catch (Exception exception)
            {

                return null;
            }
        }
        public async Task<bool> Delete(long listValueId)
        {
            using (_context = new ListEntryContext())
            {
                try
                {

                    var delListEntries = new Events.Entities.Models.ListValue()
                    {

                        ListValueID = listValueId,
                        Status = false,
                        ListValueName = String.Empty,
                        EntryType = "System",
                        CreatedBy = 1,
                        CreatedOn = DateTime.Now
                    };
                    _context.ListValues.Attach(delListEntries);
                    _context.Entry(delListEntries).Property(x => x.Status).IsModified = true;
                    await _context.SaveChangesAsync();

                    return true;
                }
                catch (DbEntityValidationException dbEx)
                {

                    foreach (var eve in dbEx.EntityValidationErrors)
                    {
                        Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                            eve.Entry.Entity.GetType().Name, eve.Entry.State);
                        foreach (var ve in eve.ValidationErrors)
                        {
                            Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                                ve.PropertyName, ve.ErrorMessage);
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


        //public async Task<List<ListValueFlat>> GetByListEntryName(string listEntryName)
        //{
        //    try
        //    {
        //        using (_context = new ListEntryContext())
        //        {
        //            var listEntryNamesCollection = listEntryName.Split(',');
        //            var listvalue = from le in _context.ListEntrys
        //                            join lv in _context.ListValues on le.ListEntryID equals lv.ListEntryID into lv_Default
        //                            from lvDefault in lv_Default.DefaultIfEmpty()

                                   
        //                            .Where(l =>  l.Status == true && listEntryNamesCollection.Contains(l.ListEntries.ListEntryName))
                                   
        //                            select new ListValueFlat
        //                            {
        //                                ListValueID = lvDefault != null ? lvDefault.ListValueID : 0,
        //                                ListEntryID = le.ListEntryID,
        //                                ListEntryName = le.ListEntryName,
        //                                ListValueName = lvDefault.ListValueName,
        //                                EntryType = le.EntryType,
        //                                Status = le.Status,
        //                            };

        //            var result = listvalue.ToList();
        //            return result;
        //        }

        //    }

        //    catch (Exception exception)
        //    {
                
        //        return null;
        //    }
        //}
    }
}
