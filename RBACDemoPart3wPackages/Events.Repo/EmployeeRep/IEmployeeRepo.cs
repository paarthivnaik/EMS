using Events.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo.EmployeeRep
{
  public  interface IEmployeeRepo
    {
      Task<Tuple<long, string>> Save(Employee obj);
      Task<Tuple<long, string>> Update(Employee obj);
        Task<object> GetById(long employeeId);
        Task<object> GetByEmpId(long employeeId);
        Task<List<Employee>> GetAll();
        Task<bool> Delete(long employeeId);
    }
}
