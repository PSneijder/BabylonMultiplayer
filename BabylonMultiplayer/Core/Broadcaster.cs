using System.Collections.Generic;
using System.Linq;
using BabylonMultiplayer.Entities;
using BabylonMultiplayer.Entities.Events;
using BabylonMultiplayer.Hubs;
using BabylonMultiplayer.Utilities;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace BabylonMultiplayer.Core
{
    public sealed class Broadcaster
    {
        private readonly IDictionary<string, Player> _players = new Dictionary<string, Player>();
        
        public void Refresh()
        {
            Broadcast();
        }

        public void Update(Player player, string id)
        {
            if (_players.ContainsKey(id))
            {
                _players[id] = player;
            }

            Broadcast(id);
        }

        public void AddPlayer(string id)
        {
            if (!_players.ContainsKey(id))
            {
                _players.Add(id, new Player(id, ColorUtils.GenerateRandomBrushColour()));

                Connect(id);

                Broadcast();
            }
        }

        public void RemovePlayer(string id)
        {
            if (_players.ContainsKey(id))
            {
                _players.Remove(id);

                Disconnect(id);

                Broadcast();
            }
        }

        private void Connect(string id)
        {
            var hub = GlobalHost.ConnectionManager.GetHubContext<GameHub>();

            string message = $"Player connected: {id}";

            hub.Clients.All.connect(new OnConnectEvent(id, message));
        }

        private void Disconnect(string id)
        {
            var hub = GlobalHost.ConnectionManager.GetHubContext<GameHub>();

            string message = $"Player disconnected: {id}";

            hub.Clients.All.disconnect(new OnDisconnectEvent(id, message));
        }

        private void Broadcast(string caller = null)
        {
            var hub = Get<GameHub>();

            var world = new World
            {
                Players = _players.Values.ToArray()
            };

            if (caller == null)
            {
                hub.Clients.All.update(world);
            }
            else
            {
                hub.Clients.AllExcept(caller).update(world);
            }
        }

        private IHubContext Get<T>() where T : IHub
        {
            return GlobalHost.ConnectionManager.GetHubContext<T>();
        }
    }
}