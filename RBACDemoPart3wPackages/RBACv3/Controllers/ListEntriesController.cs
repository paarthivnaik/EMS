﻿using Events.Entities.Models;
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
        [HttpPost]
        public  object GetAll(int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            var result =  _repo.GetAll(jtStartIndex, jtPageSize, jtSorting);
            return result;
        }

        // GET: api/ListEntries/5
       [HttpPost]
        public async Task<ListEntry> GetById(int id)
        {
            var result = await _repo.GetById(id);
            return result;
        }

        // POST: api/ListEntries
        [HttpPost]
        public async Task<long> Save(ListEntry value)
        {
            value.CreatedBy = User.Identity.GetUserId();
            return await _repo.Save(value);
        }

        // PUT: api/ListEntries/5
       [HttpPost]
        public async Task<long> Update(ListEntry value)
        {
            value.ModifiedBy = User.Identity.GetUserId();
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
