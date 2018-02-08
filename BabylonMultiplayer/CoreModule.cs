using BabylonMultiplayer.Core;
using Ninject.Modules;

namespace BabylonMultiplayer
{
    sealed class CoreModule
        : NinjectModule
    {
        public override void Load()
        {
            Bind<Broadcaster>().ToSelf().InSingletonScope();
        }
    }
}