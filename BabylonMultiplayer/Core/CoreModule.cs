using BabylonMultiplayer.Utilities;
using Newtonsoft.Json;
using Ninject.Modules;

namespace BabylonMultiplayer.Core
{
    sealed class CoreModule
        : NinjectModule
    {
        public override void Load()
        {
            var settings = new JsonSerializerSettings { ContractResolver = new SignalRContractResolver() };
            var serializer = JsonSerializer.Create(settings);

            Bind<JsonSerializer>().ToConstant(serializer).InSingletonScope();

            Bind<Broadcaster>().ToSelf().InSingletonScope();
        }
    }
}