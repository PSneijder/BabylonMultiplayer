
namespace BabylonMultiplayer.Core.Entities
{
    public sealed class Color
    {
        public byte R { get; set; }
        public byte G { get; set; }
        public byte B { get; set; }
        public byte A { get; set; }

        public static implicit operator Color (System.Drawing.Color color)
        {
            return new Color
            {
                R = color.R,
                G = color.G,
                B = color.B,
                A = color.A
            };
        }
    }
}