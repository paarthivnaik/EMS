using Events.Entities.Models;
using Events.Repo.VendorEventsRep;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace RBACv3.Controllers
{
    public class VendorEventsDataController : ApiController
    {
        private IVendorEventsRepo _vendorRepo = new VendorEventsRepo();
        [HttpPost]
        public async Task<long> Save(VendorEvent obj)
        {
            obj.CreatedBy = User.Identity.GetUserId();
            var result = await _vendorRepo.Save(obj);
            return result;
        }
        [HttpPost]
        public async Task<long> Update(VendorEvent obj)
        {
            obj.ModifiedBy = User.Identity.GetUserId();
            var result = await _vendorRepo.Update(obj);
            return result;
        }
        [HttpGet]
        public async Task<object> GetById(long vendorId)
        {
            var result = await _vendorRepo.GetById(vendorId);
            return result;
        }
        [HttpGet]
        public async Task<object> GetDataByEvent(long vendorEventId)
        {
            var result = await _vendorRepo.GetByEventId(vendorEventId);
            return result;
        }

        [HttpGet]
        public async Task<List<VendorEvent>> GetAll()
        {
            var result = await _vendorRepo.GetAll();
            return result;
        }
       
        [HttpPost]
        public async Task<object> GetReport(DateTime fromdate, DateTime todate)
        {
            return await _vendorRepo.GetReport(fromdate, todate);
        }
        [HttpPost]
        public async Task<object> GetReport(string VendorCode)
        {
            return await _vendorRepo.GetReport(VendorCode);

        }
        [HttpPost]
        public async Task<bool> Delete(int vendorEventId)
        {
            return await _vendorRepo.Delete(vendorEventId);
        }
    }
}
