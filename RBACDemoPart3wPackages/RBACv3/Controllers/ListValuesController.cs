using Events.Entities.Models;
using Events.Entities.Models.Flat;
using Events.Repo.ListValueRep;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace RBACv3.Controllers
{
    public class ListValuesController : ApiController
    {
        IListValueRepo _repo = new ListValueRepo();
       
        [HttpGet]
        public async Task<object> Get()
        {
            var result = await _repo.GetAll();
            return result;
        }

       
        [HttpGet]
        public async Task<ListValue> Get(int id)
        {
            var result = await _repo.GetById(id);
            return result;
        }

       
        [HttpPost]
        public async Task<long> Post(ListValue value)
        {
            return await _repo.Save(value);
        }

      
        [HttpPut]
        public async Task<long> Put(ListValue value)
        {
            return await _repo.Update(value);
        }

       
        [HttpPost]
        public async Task<bool> Delete(int id)
        {
            return await _repo.Delete(id);
        }
        [HttpGet]
        public async Task<List<ListValueFlat>>GetByListEntryName(string listentryName)
        {
            return await _repo.GetByListEntryName(listentryName);
        }
    }
}
