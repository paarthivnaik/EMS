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

        public  async Task<object> GetRepByVCode(string VendorCode)
        {

            try
            {
                using (_context = new VendorsContext())
                {
                    var repData = await(from a in _context.Vendors
                                        join c in _context.VendorEvents.Where(x=>x.Status==true) on a.VendorID equals c.VendorID
                                        join b in _context.EventInfoLights on c.EventInfoID equals b.EventInfoID
                                        where a.Status == true  && a.VendorCode==VendorCode
                                        select new
                                        {
                                            a.VendorID,
                                            c.VendorEventID,
                                            c.Ammmount,
                                            c.EventInfoID,
                                            a.VendorCode,
                                            a.FirstName,
                                            a.MobileNo,
                                            a.Organization,
                                            b.CustomerName,
                                            b.EventTypeValue,
                                            b.EventRefID,
                                            c.ProgramDate,

                                        }).ToListAsync();

                    return repData;
                }
            }
            catch (Exception Ex)
            {
                return null;
            }
        }

        public async Task<object> GetRepByEVCode(string VendorCode, string EventCode)
        {
            try
            {
                using (_context = new VendorsContext())
                {
                    //var repData = await(from a in _context.VendorEvents
                    //                    join c in _context.Vendors on a.VendorID equals c.VendorID
                    //                    join b in _context.EventInfoLights on a.EventInfoID equals b.EventInfoID
                    //                    join d in _context.VendorAmmountPaids on a.VendorEventID equals d.VendorEventID into _dfEvent
                    //                    from DfEvent in _dfEvent.DefaultIfEmpty()
                    //                    where a.Status == true && c.VendorCode == VendorCode && b.EventRefID == EventCode
                    //                    select new
                    //                    {
                    //                       VendorCode= c.VendorCode,
                    //                      EventCode= b.EventRefID,
                    //                       BillNo=DfEvent!=null?DfEvent.BillNo:null,
                    //                       AmmountPaid = DfEvent != null ? DfEvent.AmmountPaid : 0,
                    //                      DateOfPaid= DfEvent != null ? DfEvent.PaidDate: (DateTime?)null

                    //                    }).ToListAsync();

                    var repData = await (from a in _context.VendorAmmountPaids
                                         join b in _context.VendorEvents on a.VendorEventID equals b.VendorEventID
                                         join c in _context.Vendors on b.VendorID equals c.VendorID
                                         join e in _context.EventInfoLights on b.EventInfoID equals e.EventInfoID
                                         where a.Status == true && c.VendorCode == VendorCode && e.EventRefID == EventCode
                                         select new
                                              {
                                                  VendorCode = c.VendorCode,
                                                  EventCode = e.EventRefID,
                                                  BillNo = a.BillNo,
                                                  AmmountPaid = a.AmmountPaid,
                                                  PaidDate = a.PaidDate

                                              }).ToListAsync();
                    return repData;
                }
            }
            catch (Exception Ex)
            {
                return null;
            }
        }


        public async Task<object> GetRepByECode(string EventCode)
        {
            try
            {
                using (_context = new VendorsContext())
                {
                    var repData = await (from a in _context.EventInfoLights
                                         join c in _context.VendorEvents.Where(x => x.Status == true) on a.EventInfoID equals c.EventInfoID
                                         join b in _context.Vendors on c.VendorID equals b.VendorID
                                         where a.Status == true && a.EventRefID == EventCode
                                         select new
                                         {
                                             b.VendorID,
                                             c.VendorEventID,
                                             c.Ammmount,
                                             c.EventInfoID,
                                             b.VendorCode,
                                             b.FirstName,
                                             a.MobileNo,
                                             b.Organization,
                                             a.CustomerName,
                                             a.EventTypeValue,
                                             a.EventRefID,
                                             c.ProgramDate,

                                         }).ToListAsync();

                    return repData;
                }
            }
            catch (Exception Ex)
            {
                return null;
            }
        }
    }
}
