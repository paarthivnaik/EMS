using Events.Entities.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.EmployeeRep
{
    public class EmployeeRepo : IEmployeeRepo
    {
        private EmployeeContext _context;
        public async Task<Tuple<long, string>> Save(Entities.Models.Employee obj)
        {
            try
            {
                using (_context = new EmployeeContext())
                {
                    obj.CreatedOn = DateTime.Now;
                    obj.Status = true;
                    _context.Entry(obj).State = obj.EmployeeID == 0 ? EntityState.Added : EntityState.Modified;
                    await _context.SaveChangesAsync();
                    
                    var res = new Tuple<long, string>(obj.EmployeeID, obj.EmployeeCode);
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

        public async Task<Tuple<long, string>> Update(Entities.Models.Employee obj)
        {

            try
            {
                using (_context = new EmployeeContext())
                {
                    obj.ModifiedOn = DateTime.Now;
                    _context.Entry(obj).Property(x => x.CreatedOn).IsModified = false;
                    _context.Entry(obj).Property(x => x.CreatedBy).IsModified = false;
                    _context.Entry(obj).Property(x => x.Status).IsModified = false;
                    _context.Entry(obj).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    var res = new Tuple<long, string>(obj.EmployeeID, obj.EmployeeCode);
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

        public async Task<object> GetById(long employeeId)
        {
            try
            {
                using (_context = new EmployeeContext())
                {
                    var resObj = await _context.Employees.Where(x => x.EmployeeID == employeeId && x.Status == true).FirstOrDefaultAsync();
                    return resObj;
                }
            }
            catch (Exception Ex)
            {

                return null;
            }
        }

        public async Task<List<Employee>> GetAll()
        {
            try
            {
                using (_context = new EmployeeContext())
                {
                    var resObj = await _context.Employees.Where(x => x.Status == true).ToListAsync();
                    return resObj;
                }
            }
            catch (Exception exception)
            {

                return null;
            }
        }


        public async Task<bool> Delete(long employeeId)
        {
            try
            {
                using (_context = new EmployeeContext())
                {
                    var delEmpEntries = new Events.Entities.Models.Employee()
                    {

                        EmployeeID = employeeId,
                        Status = false,
                        FirstName = String.Empty,
                        ProofValue = "System",
                        CreatedBy = 1,
                        CreatedOn = DateTime.Now,
                        SurName=string.Empty
                    };
                    _context.Employees.Attach(delEmpEntries);
                    _context.Entry(delEmpEntries).Property(x => x.Status).IsModified = true;
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


        public  async Task<object> GetByEmpId(long employeeId)
        {
            try
            {
                using (_context = new EmployeeContext())
                {
                    var resObj = await _context.Employees.Where(x => x.EmployeeID == employeeId && x.Status == true).Select(x => new { x.EmployeeID,x.EmployeeCode,x.FirstName}).FirstOrDefaultAsync();
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
