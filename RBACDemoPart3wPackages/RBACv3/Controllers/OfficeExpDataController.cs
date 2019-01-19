using Events.Entities.Models;
using Events.Repo.OfficeExpenses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace RBACv3.Controllers
{
    public class OfficeExpDataController : ApiController
    {
        private IOfficeExpensesRepo _expensesRepo = new OfficeExpensesRepo();
        [HttpPost]
        public async Task<long> Save(Expens obj)
        {
            obj.CreatedBy = User.Identity.GetUserId();
            var result = await _expensesRepo.Save(obj);
            return result;
        }
        [HttpPost]
        public async Task<long> Update(Expens obj)
        {
            obj.ModifiedBy = User.Identity.GetUserId();
            var result = await _expensesRepo.Update(obj);
            return result;
        }
        [HttpGet]
        public async Task<Expens> GetById(long expenseId)
        {
            var result = await _expensesRepo.GetById(expenseId);
            return result;
        }
        [HttpGet]
        public async Task<List<Expens>> GetAll()
        {
            var result = await _expensesRepo.GetAll();
            return result;
        }

        [HttpPost]
        public async Task<bool> Delete(int expenseId)
        {
            return await _expensesRepo.Delete(expenseId);
        }
        [HttpPost]
        public async Task<object> GetReport(DateTime fromdate,DateTime todate)
        {
            return await _expensesRepo.GetReport(fromdate,todate);
        }
        
    }
}
