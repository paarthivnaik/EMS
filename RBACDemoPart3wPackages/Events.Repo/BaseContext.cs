using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Events.Repo
{
    public class BaseContext<TDbcontext> : DbContext where TDbcontext : DbContext
    {
        static BaseContext()
        {
            Database.SetInitializer<TDbcontext>(null);
        }

        protected BaseContext()
            : base("name=EventManagementContext")
        {

        }
    }
}
