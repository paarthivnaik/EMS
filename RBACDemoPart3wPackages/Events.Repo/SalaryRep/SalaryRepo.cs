using Events.Entities.Models;
using Events.Repo.EmployeeRep;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.SalaryRep
{
  public  class SalaryRepo:ISalaryRepo
    {
      private EmployeeContext _context;
        public async Task<long> Save(SalaryPaid obj)
        {
            try
            {
                using (_context = new EmployeeContext())
                {
                    obj.CreatedOn = DateTime.Now;
                    obj.Status = true;
                    _context.Entry(obj).State = obj.SalaryPaidID == 0 ? EntityState.Added : EntityState.Modified;
                    await _context.SaveChangesAsync();

                    return obj.SalaryPaidID;
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

        public async Task<long> Update(SalaryPaid obj)
        {
            try
            {
                using (_context = new EmployeeContext())
                {
                    obj.ModifiedOn = DateTime.Now;
                    _context.Entry(obj).Property(x => x.CreatedOn).IsModified = false;
                    _context.Entry(obj).Property(x => x.CreatedBy).IsModified = false;
                    _context.Entry(obj).Property(x => x.EmployeeCode).IsModified = false;
                    _context.Entry(obj).Property(x => x.EmployeeID).IsModified = false;
                    _context.Entry(obj).Property(x => x.Status).IsModified = false;
                    _context.Entry(obj).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                   
                    return obj.SalaryPaidID;

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

        public async  Task<object> GetById(long salaryPaidId)
        {
            try
            {
                using (_context = new EmployeeContext())
                {
                    var resObj = await (from a in _context.SalaryPaids
                                join b in _context.Employees on a.EmployeeID equals b.EmployeeID
                                where a.SalaryPaidID==salaryPaidId && a.Status==true
                                select new
                                {
                                    a.Bonous,
                                    a.CreatedBy,
                                    a.CreatedOn,
                                    a.Description,
                                    a.EmployeeCode,
                                    a.EmployeeID,
                                    a.Incentives,
                                    a.ModifiedBy,
                                    a.ModifiedOn,
                                    a.PaidMonth,
                                    a.Salary,
                                    a.SalaryPaidID,
                                    a.Status,
                                    b.FirstName
                                }).FirstOrDefaultAsync();
                    return resObj;
                }
            }
            catch (Exception Ex)
            {

                return null;
            }
        }

        public async Task<List<SalaryPaid>> GetAll()
        {
            try
            {
                using (_context = new EmployeeContext())
                {
                    var resObj = await _context.SalaryPaids.Where(x => x.Status == true).ToListAsync();
                    return resObj;
                }
            }
            catch (Exception Ex)
            {

                return null;
            }
        }

        public async Task<bool> Delete(long salaryPaidId)
        {
            try
            {
                using (_context = new EmployeeContext())
                {
                    var delSalEntries = new Events.Entities.Models.SalaryPaid()
                    {

                        SalaryPaidID = salaryPaidId,
                        Status = false,
                        PaidMonth = DateTime.Now,
                        EmployeeID = 1,
                        CreatedBy = 1,
                        CreatedOn = DateTime.Now
                    };
                    _context.SalaryPaids.Attach(delSalEntries);
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


        public async Task<object> GetByEmpId(long employeeId)
        {
            try
            {
                using (_context = new EmployeeContext())
                {
                    var resObj = await _context.SalaryPaids.Where(x => x.EmployeeID == employeeId && x.Status == true).ToListAsync();
                    return resObj;
                }
            }
            catch (Exception Ex)
            {

                return null;
            }
        }


        public async Task<object> GetReport(DateTime fromdate, DateTime todate)
        {
            try
            {
                using (_context = new EmployeeContext())
                {
                    var resObj = await _context.SalaryPaids.Where(x => x.Status == true && x.PaidMonth >= fromdate && x.PaidMonth <= todate).ToListAsync();

                    return resObj;
                }
            }
            catch (Exception Ex)
            {

                return null;
            }
        }
        public async Task<object> GetReport(string empCode)
        {
            try
            {
                using (_context = new EmployeeContext())
                {
                    var resObj = await _context.SalaryPaids.Where(x => x.Status == true && x.EmployeeCode==empCode).ToListAsync();

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
