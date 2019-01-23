using Events.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.VendorEventAmmountPaid
{
  public  interface IVendorEventAmmountPaidRepo
    {
      Task<long> Save(VendorAmmountPaid obj);
      Task<long> Update(VendorAmmountPaid obj);
        Task<object> GetById(long vendorEventID);
        Task<object> GetByIdEdit(long VendorAmmountPaidID);
        Task<List<VendorAmmountPaid>> GetAll();
        Task<bool> Delete(long vendorAmmountPaidId);
    }
}
