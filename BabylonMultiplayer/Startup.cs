using BabylonMultiplayer.Common;
using BabylonMultiplayer.Core;
using BabylonMultiplayer.Utilities;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin.Cors;
using Newtonsoft.Json;
using Ninject;
using Ninject.Web.Common.OwinHost;
using Owin;

namespace BabylonMultiplayer
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            IKernel kernel = CreateKernel();

            var resolver = new NinjectSignalRDependencyResolver(kernel);
            var config = new HubConfiguration { EnableDetailedErrors = true, Resolver = resolver };

            GlobalHost.DependencyResolver = resolver;

            app.UseCors(CorsOptions.AllowAll);

            app.UseNinjectMiddleware(() => kernel);
#if DEBUG
            app.UseErrorPage();
#endif
            app.MapSignalR(config);

            app.UseWelcomePage();
        }

        private IKernel CreateKernel()
        {
            IKernel kernel = new StandardKernel();
            kernel.Load(new CommonModule());
            kernel.Load(new CoreModule());

            kernel.TryGet<Broadcaster>();

            var settings = new JsonSerializerSettings { ContractResolver = new SignalRContractResolver() };
            var serializer = JsonSerializer.Create(settings);
            kernel.Bind<JsonSerializer>().ToConstant(serializer);

            return kernel;
        }
    }
}