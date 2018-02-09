using Ninject.Modules;

namespace BabylonMultiplayer.Core
{
    public sealed class CoreModule
        : NinjectModule
    {
        public override void Load()
        {
            Bind<Broadcaster>().ToSelf().InSingletonScope();
        }
    }
}