using System.Numerics;
using Newtonsoft.Json;

namespace BabylonMultiplayer.Entities
{
    public sealed class Player
    {
        public Player(string id, Color color)
        {
            Id = id;
            Position = new Vector3(0, 0, 0);
            Color = color;
        }

        public string Id { get; set; }

        public Vector3 Position { get; set; }

        public Color Color { get; set; }

        [JsonIgnore]
        public string LastUpdatedBy { get; set; }
    }
}