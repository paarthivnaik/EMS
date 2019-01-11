using Events.Entities.Models;
using Events.Repo.EventsRepo;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.OfficeExpenses
{
   public class OfficeExpensesRepo:IOfficeExpensesRepo
    {
       private OfficeExpensesContext _context;
        public async Task<long> Save(Expens obj)
        {
            using (_context = new OfficeExpensesContext())
            {
                try
                {

                    obj.CreatedOn = DateTime.Now;
                    obj.Status = true;
                    _context.Entry(obj).State = obj.ExpenseID == 0 ? EntityState.Added : EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return obj.ExpenseID;

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

        public async Task<long> Update(Expens obj)
        {
            using (_context = new OfficeExpensesContext())
            {
                try
                {

                    obj.ModifiedOn = DateTime.Now;
                    _context.Entry(obj).Property(x => x.CreatedOn).IsModified = false;
                    _context.Entry(obj).Property(x => x.CreatedBy).IsModified = false;
                    _context.Entry(obj).Property(x => x.Status).IsModified = false;
                    _context.Entry(obj).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return obj.ExpenseID;
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

        public async Task<Expens> GetById(long expensesId)
        {
            try
            {
                using (_context = new OfficeExpensesContext())
                {
                    var resObj = await _context.Expenses.Where(x => x.ExpenseID == expensesId && x.Status == true).FirstOrDefaultAsync();
                    return resObj;
                }
            }
            catch (Exception Ex)
            {

                return null;
            }

        }

        public async Task<List<Expens>> GetAll()
        {
            try
            {
                using (_context = new OfficeExpensesContext())
                {
                    var resObj = await _context.Expenses.Where(x => x.Status == true).ToListAsync();
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
