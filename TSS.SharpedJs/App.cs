using System;
using Bridge;
using Bridge.Html5;
using System.Threading.Tasks;
using System.Threading;

namespace TSS.SharpedJs
{
    public class App
    {
        
        public static void Main()
        {
            
            GameMainDispatcher game = new GameMainDispatcher();
            game.RunGame();
        }

        
    }
}