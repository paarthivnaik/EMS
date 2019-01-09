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
        
        Task<object> Save(ListEntry obj);
        Task<object> Update(ListEntry obj);
        Task<ListEntry> GetById(long listEntryId);
        object GetAll(int startIndex, int count, string sorting);
        Task<object> Delete(long listEntryId);
    }
}
