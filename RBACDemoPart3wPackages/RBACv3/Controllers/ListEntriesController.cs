using Events.Entities.Models;
using Events.Repo.ListEntryRep;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace RBACv3.Controllers
{
    public class ListEntriesController : ApiController
    {
        IListEntryRepo _repo = new ListEntryRepo();
        // GET: api/ListEntries
        [HttpGet]
        public async Task<object> Get()
        {
            var result = await _repo.GetAll();
            return result;
        }

        // GET: api/ListEntries/5
        [HttpGet]
        public async Task<ListEntry> Get(int id)
        {
            var result = await _repo.GetById(id);
            return result;
        }

        // POST: api/ListEntries
        [HttpPost]
        public async Task<long> Post(ListEntry value)
        {
            return await _repo.Save(value);
        }

        // PUT: api/ListEntries/5
        [HttpPut]
        public async Task<long> Put(ListEntry value)
        {
            return await _repo.Update(value);
        }

        // DELETE: api/ListEntries/5
        [HttpPost]
        public async Task<bool> Delete(int id)
        {
            return await _repo.Delete(id);
        }
    }
}
