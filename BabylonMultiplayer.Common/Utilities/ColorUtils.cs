using System;
using System.Drawing;

namespace BabylonMultiplayer.Common.Utilities
{
    public static class ColorUtils
    {
        private static readonly Random Random;

        static ColorUtils()
        {
            Random = new Random(DateTime.Now.Ticks.GetHashCode());
        }
        
        public static Color GenerateRandomColor(Color mix)
        {
            int red = Random.Next(256);
            int green = Random.Next(256);
            int blue = Random.Next(256);

            red = (red + mix.R) / 2;
            green = (green + mix.G) / 2;
            blue = (blue + mix.B) / 2;

            Color color = Color.FromArgb(red, green, blue);
            return color;
        }
        
        public static Color GenerateRandomBrushColour()
        {
            return Color.FromArgb(0, Random.Next(128, 256), Random.Next(128, 256));
        }
    }
}