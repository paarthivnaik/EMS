using Events.Entities.Models;
using Events.Repo.VendorEventAmmountPaid;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace RBACv3.Controllers
{
    public class VendorPaidDataController : ApiController
    {
        private IVendorEventAmmountPaidRepo _vendorRepo = new VendorEventAmmountPaidRepo();
        [HttpPost]
        public async Task<long> Save(VendorAmmountPaid obj)
        {
            obj.CreatedBy = User.Identity.GetUserId();
            var result = await _vendorRepo.Save(obj);
            return result;
        }
        [HttpPost]
        public async Task<long> Update(VendorAmmountPaid obj)
        {
            obj.ModifiedBy = User.Identity.GetUserId();
            var result = await _vendorRepo.Update(obj);
            return result;
        }
        [HttpGet]
        public async Task<object> GetById(long VendorEventID)
        {
            var result = await _vendorRepo.GetById(VendorEventID);
            return result;
        }
        [HttpGet]
        public async Task<object> GetByIdEdit(long VendorAmmountPaidID)
        {
            var result = await _vendorRepo.GetByIdEdit(VendorAmmountPaidID);
            return result;
        }

        [HttpPost]
        public async Task<bool> Delete(int vendorAmmountPaidId)
        {
            return await _vendorRepo.Delete(vendorAmmountPaidId);
        }
    }
}
