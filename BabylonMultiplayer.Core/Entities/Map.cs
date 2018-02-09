
namespace BabylonMultiplayer.Core.Entities
{
    public sealed class Map
    {
        public Map(string name)
        {
            Name = name;
        }

        public string Name { get; set; }
    }
}