using BabylonMultiplayer.Common.Resolvers;
using Ninject.Modules;

namespace BabylonMultiplayer.Common
{
    public sealed class CommonModule
        : NinjectModule
    {
        public override void Load()
        {
            Bind<IHubResolver>().To<HubResolver>().InSingletonScope();
        }
    }
}