using Events.Entities.Models;
using Events.Repo.EmployeeRep;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace RBACv3.Controllers
{
    public class EmployeeDataController : ApiController
    {
        private IEmployeeRepo _empRepo = new EmployeeRepo();
        [HttpPost]
        public async Task<string[]> Save(Employee obj)
        {
            obj.CreatedBy = User.Identity.GetUserId();
            var result = await _empRepo.Save(obj);
            return result;
        }
        [HttpPost]
        public async Task<string[]> Update(Employee obj)
        {
            obj.ModifiedBy = User.Identity.GetUserId();
            var result = await _empRepo.Update(obj);
            return result;
        }
        [HttpGet]
        public async Task<object> GetById(long employeeId)
        {
            var result = await _empRepo.GetById(employeeId);
            return result;
        }
        
        [HttpGet]
        public async Task<List<Employee>> GetAll()
        {
            var result = await _empRepo.GetAll();
            return result;
        }
        [HttpGet]
        public async Task<object> GetByEmpId(long employeeId)
        {
            var result = await _empRepo.GetByEmpId(employeeId);
            return result;
        }


        [HttpPost]
        public async Task<bool> Delete(int employeeId)
        {
            return await _empRepo.Delete(employeeId);
        }
    }
}
