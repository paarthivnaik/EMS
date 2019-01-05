using Events.Entities.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.EventsRepo
{
    public class EventsRepo : IEventsRepo
    {
        private EventsContext _context;
        public async Task<long> Save(EventInfo obj)
        {
            using (_context = new EventsContext())
            {
                obj.CreatedOn = DateTime.Now;
                _context.Entry(obj).State = obj.EventInfoID == 0 ? EntityState.Added : EntityState.Modified;
                await _context.SaveChangesAsync();
                return obj.EventInfoID;

            }


        }

        public async Task<long> Update(EventInfo obj)
        {
            using (_context = new EventsContext())
            {
                obj.ModifiedOn = DateTime.Now;
                _context.Entry(obj).Property(x => x.CreatedOn).IsModified = false;
                _context.Entry(obj).Property(x => x.CreatedBy).IsModified = false;
                _context.Entry(obj).Property(x => x.Status).IsModified = false;
                _context.Entry(obj).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return obj.EventInfoID;
            }
        }

        public Task<EventInfo> GetById(long eventInfoId)
        {
            throw new NotImplementedException();
        }

        public Task<List<EventInfo>> GetAll(long eventInfoId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(long eventInfoId)
        {
            throw new NotImplementedException();
        }
    }
}
