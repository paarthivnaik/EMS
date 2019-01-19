using Events.Entities.Models;
using Events.Repo.VendorsRep;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace RBACv3.Controllers
{
    public class VendorDataController : ApiController
    {
        private IVendorRepo _vendorRepo = new VendorRepo();
        [HttpPost]
        public async Task<string[]> Save(Vendor obj)
        {
            obj.CreatedBy = User.Identity.GetUserId();
            var result = await _vendorRepo.Save(obj);
            return result;
        }
        [HttpPost]
        public async Task<string[]> Update(Vendor obj)
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
        public async Task<List<Vendor>> GetAll()
        {
            var result = await _vendorRepo.GetAll();
            return result;
        }
        [HttpPost]
        public async Task<object> GetByEmpId(long VendorId)
        {
            var result = await _vendorRepo.GetByEmpId(VendorId);
            return result;
        }
        //[HttpPost]
        //public async Task<object> GetReport(DateTime fromdate, DateTime todate)
        //{
        //    return await _vendorRepo.GetReport(fromdate, todate);
        //}
        [HttpPost]
        public async Task<object> GetReport(string vCode)
        {
            return await _vendorRepo.GetReport(vCode);
        }
    }
}
