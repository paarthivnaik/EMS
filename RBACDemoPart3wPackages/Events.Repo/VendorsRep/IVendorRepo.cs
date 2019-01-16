using Events.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.VendorsRep
{
   public interface IVendorRepo
    {
       Task<string[]> Save(Vendor obj);
       Task<string[]> Update(Vendor obj);
        Task<object> GetById(long vendorId);
        Task<object> GetByEmpId(long vendorId);
        Task<List<Vendor>> GetAll();
        Task<bool> Delete(long vendorId);
        Task<object> GetReport(string vendorCode);
    }
}
