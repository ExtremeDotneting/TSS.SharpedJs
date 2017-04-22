using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSS.SharpedJs
{
    class GameMainDispatcher
    {
        UniverseOutputUIElement userInterface;
        GameOutputDispatcher god;

        public void RunGame()
        {
            ParseInputValues();
            userInterface = UniverseOutputUIElement.DefInstance;
            SetLangFromCookie();
            InitializeLangChangeUrl();
            InitializeLabels();
            god = new GameOutputDispatcher(userInterface);
            

        }

        void SetLangFromCookie()
        {
            string lang = null;
            if (CookieManager.Instance.ContainsCookie("lang"))
                lang = CookieManager.Instance.GetValue("lang")?.ToString();
            if (lang == "ru")
                LanguageHandler.SetLanguage(LanguageHandlerCulture.ru);
            else
                LanguageHandler.SetLanguage(LanguageHandlerCulture.en);
        }

        void InitializeLangChangeUrl()
        {
            var changeLangUrl = Document.GetElementById("changeLangUrl") as HTMLAnchorElement;
            if (CookieManager.Instance.GetValue("lang").ToString().Equals("en"))
            {
                changeLangUrl.InnerHTML = "Switch to Russian";
                changeLangUrl.Href = Window.Location.Protocol + "//" + Window.Location.Host + Window.Location.PathName + "?lang=ru";
                (Document.GetElementById("openManualUrl") as HTMLAnchorElement).Href = "./manual_en.docx";
            }
            else
            {
                changeLangUrl.InnerHTML = "Switch to English";
                changeLangUrl.Href = Window.Location.Protocol + "//" + Window.Location.Host + Window.Location.PathName + "?lang=en";
                (Document.GetElementById("openManualUrl") as HTMLAnchorElement).Href = "./manual_ru.docx";
            }

        }

        void InitializeLabels()
        {
            (userInterface.ButtonCreateNewUniverse as HTMLInputElement).Value = LanguageHandler.Instance.ButtonCreateUniverse;
            (userInterface.ButtonStart as HTMLInputElement).Value = LanguageHandler.Instance.ButtonStarText;
            (userInterface.ButtonStop as HTMLInputElement).Value = LanguageHandler.Instance.ButtonPauseText;
            (userInterface.ButtonClearField as HTMLInputElement).Value = LanguageHandler.Instance.ButtonClearFieldText;
            (userInterface.ButtonGenerateFoodOnAllField as HTMLInputElement).Value = LanguageHandler.Instance.ButtonGenerateFoodOnAllText;
            (userInterface.ButtonGenerateCells as HTMLInputElement).Value = LanguageHandler.Instance.ButtonGenerateCellsText;
            (userInterface.ButtonСonstsUniverseRedactor as HTMLInputElement).Value = LanguageHandler.Instance.ButtonConstsRedactorText;

            Document.GetElementById("labelUniverseInfo").InnerHTML = LanguageHandler.Instance.TabItem_SimulationInfoHeader;
            Document.GetElementById("labelTimeout").InnerHTML = LanguageHandler.Instance.LabelDelayText;
            Document.GetElementById("labelGameControls").InnerHTML = LanguageHandler.Instance.TabItem_GameHeader;
            Document.GetElementById("openManualUrl").InnerHTML = LanguageHandler.Instance.LabelOpenManual;
            Document.Title = LanguageHandler.Instance.TitleOfUniverseOutputWindow;
        }

        void ParseInputValues()
        {
            //init def values in cookie manager
            GetValueFromUrlOrCookie("lang", "en");
            GetValueFromUrlOrCookie("w", 30);
            GetValueFromUrlOrCookie("h", 22);
        }

        object GetValueFromUrlOrCookie(string key, object defValue=null)
        {
            object res = UrlParamsManager.GetParameter(key);
            if (res == null)
            {
                if (CookieManager.Instance.ContainsCookie(key))
                    res = CookieManager.Instance.GetValue(key);
            }
            res = res ?? defValue;
            CookieManager.Instance.SetValue(key, res);
            return res ;
        }
    }
}
