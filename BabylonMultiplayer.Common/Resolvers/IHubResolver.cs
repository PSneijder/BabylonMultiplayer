using Microsoft.AspNet.SignalR;

namespace BabylonMultiplayer.Common.Resolvers
{
    public interface IHubResolver
    {
        IHubContext Resolve(string name);
    }
}