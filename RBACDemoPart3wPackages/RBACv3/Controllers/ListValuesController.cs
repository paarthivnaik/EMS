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
       
        [HttpPost]
        public async Task<object> GetAll()
        {
            var result = await _repo.GetAll();
            return result;
        }


       [HttpPost]
        public object GetById(int id)
        {
            var result =  _repo.GetById(id);
            return result;
        }


       [HttpPost]
        public async Task<object> Save(ListValue value)
        {
            value.CreatedBy = User.Identity.GetUserId();
            return await _repo.Save(value);
        }


      [HttpPost]
        public async Task<object> Update(ListValue value)
        {
            value.ModifiedBy = User.Identity.GetUserId();
            return await _repo.Update(value);
        }


       [HttpPost]
        public async Task<object> Delete(int id)
        {
            return await _repo.Delete(id);
        }
        //[HttpGet]
        //public async Task<List<ListValueFlat>>GetByListEntryName(string listentryName)
        //{
        //    return await _repo.GetByListEntryName(listentryName);
        //}
    }
}
