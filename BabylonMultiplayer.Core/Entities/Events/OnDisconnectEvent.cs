
namespace BabylonMultiplayer.Core.Entities.Events
{
    public sealed class OnDisconnectEvent
    {
        public OnDisconnectEvent(string id, string message)
        {
            Id = id;
            Message = message;
        }

        public string Id { get; set; }
        public string Message { get; set; }
    }
}