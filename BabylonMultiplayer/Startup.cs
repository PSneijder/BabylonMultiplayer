using System.Net.Http.Formatting;
using System.Web.Http;
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
            var settings = new JsonSerializerSettings { ContractResolver = new SignalRContractResolver() };
            var serializer = JsonSerializer.Create(settings);

            IKernel kernel = CreateKernel(serializer);

            var config = new HttpConfiguration();
            var resolver = new NinjectSignalRDependencyResolver(kernel);
            var hubConfig = new HubConfiguration { EnableDetailedErrors = true, Resolver = resolver };

            config.Formatters.Clear();
            config.Formatters.Add(new JsonMediaTypeFormatter());
            config.Formatters.JsonFormatter.SerializerSettings = settings;

            GlobalHost.DependencyResolver = resolver;

            app.UseCors(CorsOptions.AllowAll);

            app.UseNinjectMiddleware(() => kernel);
#if DEBUG
            app.UseErrorPage();
#endif
            app.MapSignalR(hubConfig);

            config.MapHttpAttributeRoutes();

            app.UseWebApi(config);

            app.UseWelcomePage();
        }

        private IKernel CreateKernel(JsonSerializer serializer)
        {
            IKernel kernel = new StandardKernel();
            kernel.Load(new StartupModule());
            kernel.Load(new CoreModule());
            kernel.Load(new CommonModule());

            kernel.TryGet<Broadcaster>();
            
            kernel.Bind<JsonSerializer>().ToConstant(serializer);

            return kernel;
        }
    }
}