using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.VendorReportsRepo
{
   public interface IVendorsReportsRepo
    {
       Task<object> GetRepByDate(DateTime fromdate, DateTime todate);
       Task<object> GetRepByVCode(string VendorCode);
       Task<object> GetRepByEVCode(string VendorCode,string EventCode);
    }
}
