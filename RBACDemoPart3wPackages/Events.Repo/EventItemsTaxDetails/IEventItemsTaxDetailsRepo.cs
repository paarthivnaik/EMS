using Events.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.EventItemsTaxDetails
{
   public interface IEventItemsTaxDetailsRepo
    {
       Task<long> Save(EventItemsTaxDet obj);
       Task<object> GetById(long eventInfoId);
    }
}
