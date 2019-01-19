using Events.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.OfficeExpenses
{
   public interface IOfficeExpensesRepo
    {
        Task<long> Save(Expens obj);
        Task<long> Update(Expens obj);
        Task<Expens> GetById(long expensesId);
        Task<List<Expens>> GetAll();
        Task<bool> Delete(long expensesId);
        Task<object> GetReport(DateTime fromdate,DateTime todate);
    }
}
