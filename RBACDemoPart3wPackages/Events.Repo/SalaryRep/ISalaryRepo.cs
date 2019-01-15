using Events.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.SalaryRep
{
   public interface ISalaryRepo
    {
       Task<long> Save(SalaryPaid obj);
       Task<long> Update(SalaryPaid obj);
        Task<object> GetById(long salaryPaidId);
        Task<object> GetByEmpId(long employeeId);
        Task<List<SalaryPaid>> GetAll();
        Task<bool> Delete(long salaryPaidId);
        Task<object> GetReport(DateTime fromdate, DateTime todate);
        Task<object> GetReport(string empCode);
    }
}
