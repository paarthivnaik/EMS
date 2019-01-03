using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(RBACv3.Startup))]
namespace RBACv3
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
