using Bridge;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSS.SharpedJs
{
    static class UrlParamsManager
    {
        public static string GetParameter(string name)
        {
            return Script.Call<string>("GetUrlParameterValue",name);
        }
    }
}
