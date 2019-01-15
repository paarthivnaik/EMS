using Events.Entities.Models;
using Events.Repo.SalaryRep;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace RBACv3.Controllers
{
    public class SalariesDataController : ApiController
    {
        private ISalaryRepo _salRepo = new SalaryRepo();
        [HttpPost]
        public async Task<long> Save(SalaryPaid obj)
        {
            obj.CreatedBy = User.Identity.GetUserId();
            var result = await _salRepo.Save(obj);
            return result;
        }
        [HttpPost]
        public async Task<long> Update(SalaryPaid obj)
        {
            obj.ModifiedBy = User.Identity.GetUserId();
            var result = await _salRepo.Update(obj);
            return result;
        }
        [HttpGet]
        public async Task<object> GetById(long salPaidId)
        {
            var result = await _salRepo.GetById(salPaidId);
            return result;
        }

        [HttpGet]
        public async Task<List<SalaryPaid>> GetAll()
        {
            var result = await _salRepo.GetAll();
            return result;
        }
        [HttpPost]
        public async Task<object> GetByEmpId(long employeeId)
        {
            var result = await _salRepo.GetByEmpId(employeeId);
            return result;
        }
        [HttpPost]
        public async Task<object> GetReport(DateTime fromdate, DateTime todate)
        {
            return await _salRepo.GetReport(fromdate, todate);
        }
        [HttpPost]
        public async Task<object> GetReport(string empCode)
        {
            return await _salRepo.GetReport(empCode);
        }
    }
}
