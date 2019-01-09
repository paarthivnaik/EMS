using Events.Entities.Models;
using Events.Entities.Models.Flat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.ListValueRep
{
  public  interface IListValueRepo
    {
      Task<long> Save(ListValue obj);
      Task<long> Update(ListValue obj);
     // Task<List<ListValueFlat>> GetByListEntryName(string listEntryName);
      object GetById(long listentryId);
      Task<object> GetAll();
      Task<bool> Delete(long listValueId);
    }
}
