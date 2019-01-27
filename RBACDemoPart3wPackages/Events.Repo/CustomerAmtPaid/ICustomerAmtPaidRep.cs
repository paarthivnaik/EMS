using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.CustomerAmtPaid
{
  public  interface ICustomerAmtPaidRep
    {
      Task<long> Save(Events.Entities.Models.CustomerAmtPaid obj);
      Task<long> Update(Events.Entities.Models.CustomerAmtPaid obj);
      Task<object> GetById(long CustomerAmtPaidId);
      Task<object> GetAll(long eventInfoId);
      Task<bool> Delete(long CustomerAmtPaidId);
    }
}
