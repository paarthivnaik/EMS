using Events.Repo.VendorReportsRepo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace RBACv3.Controllers
{
    public class VendorReportsDataController : ApiController
    {
        private IVendorsReportsRepo _ReportRepo = new VendorsReportsRepo();
        [HttpPost]
        public async Task<object> GetRepByDate(DateTime fromdate, DateTime todate)
        {
            return await _ReportRepo.GetRepByDate(fromdate, todate);
        }
        [HttpPost]
        public async Task<object> GetRepByVCode(string VendorCode)
        {
            return await _ReportRepo.GetRepByVCode(VendorCode);
        }
        [HttpPost]
        public async Task<object> GetRepByECode(string EventCode)
        {
            return await _ReportRepo.GetRepByECode(EventCode);
        }
        [HttpPost]
        public async Task<object> GetRepByEVCode(string VendorCode,string EventCode)
        {
            return await _ReportRepo.GetRepByEVCode(VendorCode,EventCode);
        }
    }
}
