using System.Threading.Tasks;
using BabylonMultiplayer.Core;
using BabylonMultiplayer.Entities;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace BabylonMultiplayer.Hubs
{
    [HubName("gamehub")]
    public class GameHub
		: Hub
    {
        private readonly Broadcaster _broadcaster;
		
        public GameHub(Broadcaster broadcaster)
        {
            _broadcaster = broadcaster;
        }
        
        public void SendMovement(Player player)
        {
            string connectionId = Context.ConnectionId;

            _broadcaster.Update(player, connectionId);
        }

        public override Task OnConnected()
        {
            string connectionId = Context.ConnectionId;

            _broadcaster.AddPlayer(connectionId);

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            string connectionId = Context.ConnectionId;

            _broadcaster.RemovePlayer(connectionId);

            return base.OnDisconnected(stopCalled);
        }
    }
}