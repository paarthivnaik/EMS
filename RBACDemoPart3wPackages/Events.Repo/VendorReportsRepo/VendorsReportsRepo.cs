using Events.Repo.VendorsRep;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Entity.Validation;
namespace Events.Repo.VendorReportsRepo
{
    public class VendorsReportsRepo : IVendorsReportsRepo
    {
        private VendorsContext _context;
        public async Task<object> GetRepByDate(DateTime fromdate, DateTime todate)
        {
           try
           {
               using(_context=new VendorsContext())
               {
                   var repData = await (from a in _context.VendorEvents
                                        join c in _context.Vendors on a.VendorID equals c.VendorID
                                        join b in _context.EventInfoLights on a.EventInfoID equals b.EventInfoID
                                        where a.Status == true && a.ProgramDate >= fromdate && a.ProgramDate <= todate
                                        select new
                                        {
                                            a.VendorID,
                                            a.VendorEventID,
                                            a.Ammmount,
                                            a.EventInfoID,
                                            c.VendorCode,
                                            c.FirstName,
                                            c.MobileNo,
                                            c.Organization,
                                            b.CustomerName,
                                            b.EventTypeValue,
                                            b.EventRefID,
                                            a.ProgramDate,
                                            
                                        }).ToListAsync();

                   return repData;
               }
           }
            catch(Exception Ex)
           {
               return null;
           }
        }

        public Task<object> GetRepByVCode(string VendorCode)
        {
            throw new NotImplementedException();
        }

        public Task<object> GetRepByEVCode(string VendorCode, string EventCode)
        {
            throw new NotImplementedException();
        }
    }
}
