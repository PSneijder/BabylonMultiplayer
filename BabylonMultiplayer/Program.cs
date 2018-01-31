using System;
using Microsoft.Owin.Hosting;

namespace BabylonMultiplayer
{
    class Program
    {
        static void Main()
        {
            string baseAddress = "http://localhost:9000/";

            using (WebApp.Start<Startup>(url: baseAddress))
            {
                Console.WriteLine("Server is running. Press ANY key to quit.");
                Console.ReadKey();
            }
        }
    }
}