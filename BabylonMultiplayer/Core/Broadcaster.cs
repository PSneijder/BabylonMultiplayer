using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using BabylonMultiplayer.Entities;
using BabylonMultiplayer.Entities.Events;
using BabylonMultiplayer.Hubs;
using BabylonMultiplayer.Utilities;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Color = System.Drawing.Color;

namespace BabylonMultiplayer.Core
{
    public sealed class Broadcaster
    {
        private readonly IDictionary<string, Player> _players = new Dictionary<string, Player>();
        private readonly Timer _loop;

        //private bool _updated;

        public Broadcaster()
        {
            TimeSpan interval = TimeSpan.FromMilliseconds(40);

            _loop = new Timer(Broadcast, null, interval, interval);
        }

        public void Broadcast(object state)
        {
            var hub = Get<GameHub>();

            var world = new World
            {
                Players = _players.Values.ToArray()
            };

            hub.Clients.All.update(world);

            //foreach (Player player in _players.Values)
            //{
            //    _hub.Clients.AllExcept(player.LastUpdatedBy).update(player);
            //}

            //_updated = true;
        }

        public void Update(Player player, string id)
        {
            if (_players.ContainsKey(id))
            {
                _players[id] = player;
            }
        }

        public void AddPlayer(string id)
        {
            if (!_players.ContainsKey(id))
            {
                _players.Add(id, new Player(id, ColorUtils.GenerateRandomBrushColour()));

                Connect(id);
            }
        }

        public void RemovePlayer(string id)
        {
            if (_players.ContainsKey(id))
            {
                _players.Remove(id);

                Disconnect(id);
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

        private IHubContext Get<T>() where T : IHub
        {
            return GlobalHost.ConnectionManager.GetHubContext<T>();
        }
    }
}