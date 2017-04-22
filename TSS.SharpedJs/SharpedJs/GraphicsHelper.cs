using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSS.SharpedJs
{
    static class GraphicsHelper
    {
        public static string CssColorFromInt(int num)
        {
            byte[] byteArr = IntToBytes(num);
            return string.Format("#{0:X2}{1:X2}{2:X2}", byteArr[1], byteArr[2], byteArr[3]);
        }

        public static byte[] IntToBytes(int num)
        {
            byte[] res = new byte[4];

            res[0] = (byte)(num >> 24);
            res[1] = (byte)(num >> 16);
            res[2] = (byte)(num >> 8);
            res[3] = (byte)(num /*>> 0*/);
            return res;
        }
    }
}
