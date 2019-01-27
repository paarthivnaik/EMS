using Events.Entities.Models;
using Events.Repo.CustomerAmtPaid;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace RBACv3.Controllers
{
    public class CustomerPaidDataController : ApiController
    {
        private ICustomerAmtPaidRep _custRepo = new CustomerAmtPaidRep();
        [HttpPost]
        public async Task<long> Save(CustomerAmtPaid obj)
        {
            obj.CreatedBy = User.Identity.GetUserId();
            var result = await _custRepo.Save(obj);
            return result;
        }
        [HttpPost]
        public async Task<long> Update(CustomerAmtPaid obj)
        {
            obj.ModifiedBy = User.Identity.GetUserId();
            var result = await _custRepo.Update(obj);
            return result;
        }
        [HttpGet]
        public async Task<object> GetById(long CustomerAmtPaidId)
        {
            var result = await _custRepo.GetById(CustomerAmtPaidId);
            return result;
        }
        [HttpGet]
        public async Task<object> GetAll(long eventInfoId)
        {
            var result = await _custRepo.GetAll(eventInfoId);
            return result;
        }
        [HttpGet]
        public async Task<bool> Delete(long CustomerAmtPaidId)
        {
            var result = await _custRepo.Delete(CustomerAmtPaidId);
            return result;
        }
    }
}
