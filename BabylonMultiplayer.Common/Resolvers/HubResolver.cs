using Microsoft.AspNet.SignalR;

namespace BabylonMultiplayer.Common.Resolvers
{
    sealed class HubResolver
        : IHubResolver
    {
        public IHubContext Resolve(string name)
        {
            return GlobalHost.ConnectionManager.GetHubContext(name);
        }
    }
}