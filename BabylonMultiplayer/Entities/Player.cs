using System.Numerics;
using Newtonsoft.Json;

namespace BabylonMultiplayer.Entities
{
    public sealed class Player
    {
        public Player(string id)
        {
            Id = id;
            Position = new Vector3(10, 0, 0);
        }

        public string Id { get; set; }

        public Vector3 Position { get; set; }

        [JsonIgnore]
        public string LastUpdatedBy { get; set; }
    }
}