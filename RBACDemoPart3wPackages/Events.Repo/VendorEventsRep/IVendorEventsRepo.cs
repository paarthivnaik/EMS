using Events.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.VendorEventsRep
{
  public  interface IVendorEventsRepo
    {
      Task<long> Save(VendorEvent obj);
      Task<long> Update(VendorEvent obj);
      Task<object> GetById(long vendorId);
        Task<object> GetByEventId(long eventId);
        Task<List<VendorEvent>> GetAll();
        Task<bool> Delete(long salaryPaidId);
        Task<object> GetReport(DateTime fromdate, DateTime todate);
        Task<object> GetReport(string empCode);
    }
}
