using Events.Entities.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.ListEntryRep
{
  public  class ListEntryRepo:IListEntryRepo
    {
      private ListEntryContext _context;
        public async Task<long> Save(ListEntry obj)
        {
            using(_context=new ListEntryContext())
            {
                try
                {
                    if (!_context.ListEntrys.Any(m => m.ListEntryName == obj.ListEntryName && m.ListEntryID == obj.ListEntryID && m.Status == true))
                    {
                        obj.CreatedOn = DateTime.Now;
                        obj.Status = true;
                        obj.EntryType = "System";
                        _context.Entry(obj).State = obj.ListEntryID == 0 ? EntityState.Added : EntityState.Modified;
                        await _context.SaveChangesAsync();
                        return obj.ListEntryID;
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

        public async Task<long> Update(ListEntry obj)
        {
            using (_context = new ListEntryContext())
            {
                try
                {
                    if (!_context.ListEntrys.Any(m => m.ListEntryName == obj.ListEntryName && m.ListEntryID != obj.ListEntryID && m.Status == true))
                    {
                        obj.ModifiedOn = DateTime.Now;
                        _context.Entry(obj).Property(x => x.CreatedOn).IsModified = false;
                        _context.Entry(obj).Property(x => x.CreatedBy).IsModified = false;
                        _context.Entry(obj).Property(x => x.Status).IsModified = false;
                        _context.Entry(obj).State = EntityState.Modified;
                        await _context.SaveChangesAsync();
                        return obj.ListEntryID;
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

        public async Task<ListEntry> GetById(long listEntryId)
        {
            try
            {
                using (_context = new ListEntryContext())
                {
                    var resObj = await _context.ListEntrys.Where(x => x.ListEntryID == listEntryId && x.Status == true).FirstOrDefaultAsync();
                    return resObj;
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

        public async Task<bool> Delete(long listEntryId)
        {
            using (_context = new ListEntryContext())
            {
                try
                {

                    var delListEntries = new Events.Entities.Models.ListEntry()
                        {
                            
                            ListEntryID = listEntryId,
                            Status = false,
                            ListEntryName = String.Empty,
                           EntryType="System",
                            CreatedBy=1,
                            CreatedOn=DateTime.Now
                    

                        };
                    _context.ListEntrys.Attach(delListEntries);
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
    }
}
