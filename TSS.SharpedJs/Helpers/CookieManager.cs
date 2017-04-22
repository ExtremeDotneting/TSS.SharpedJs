using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge;
using Bridge.Html5;

namespace TSS.SharpedJs
{
    sealed class CookieManager
    {
        
        static Dictionary<string, object> CookieBuf;
        static CookieManager instance;
        public bool IsCookiesEnabled { get; private set; }

        public static CookieManager Instance
        {
            get
            {
                if (instance == null)
                    instance = new CookieManager();
                return instance;
            }
        }

        CookieManager()
        {
            IsCookiesEnabled = Script.Get<bool>("navigator.cookieEnabled") && Script.Get<string>("window.location.protocol") != "file:";
            if (!IsCookiesEnabled)
            {
                CookieBuf = new Dictionary<string, object>();
            }

        }
        public object GetValue(string cookieName)
        {
            if (IsCookiesEnabled)
                return Script.Call<object>("HelperForGetCookie", cookieName);
            else
                return CookieBuf[cookieName];
        }
        public void SetValue(string cookieName, object value)
        {
            if (IsCookiesEnabled)
                Script.Call("HelperForSetCookie", cookieName, value,"");
            else
            {
                if (ContainsCookie(cookieName))
                    CookieBuf[cookieName] = value;
                else
                    CookieBuf.Add(cookieName,value);
            }

        }
        public bool ContainsCookie(string cookieName)
        {
            if (IsCookiesEnabled)
                return Script.Undefined != Script.Call<object>("HelperForGetCookie", cookieName);
            else
                return CookieBuf.ContainsKey(cookieName);
        }
    }
}
