using Events.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.ListEntryRep
{
 public   interface IListEntryRepo
    {
        
        Task<long> Save(ListEntry obj);
        Task<long> Update(ListEntry obj);
        Task<ListEntry> GetById(long listEntryId);
        Task<object> GetAll();
        Task<bool> Delete(long listEntryId);
    }
}
