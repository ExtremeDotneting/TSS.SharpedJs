using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSS.SharpedJs
{

    class GameOutputDispatcher
    {
        IUniverseOutputUIElement universeOutputUIElement;
        Universe universe;
        bool resumeGame = true;
        DrawerUniverse drawerUniverse;
        UniverseInfoPresenter universeInfoPresenter;
        //bool screenSizeChanged = false;
        int timeout = 0;
        double windowTimePrev = 0;
        MessageDivBox ConstsRedactorMessageDivBox;
        bool resumeGameBuf;

        public GameOutputDispatcher( IUniverseOutputUIElement universeOutputUIElement)
        {
            this.universeOutputUIElement = universeOutputUIElement;
            Initialize();
            var size = GetDefaultUniverseSize();
            CreateUniverseAndPresenters(size.Item1, size.Item2);
            Start();
        }

        public void Start()
        {
            if (universe == null)
                return;
            resumeGame = true;
            Tick();
        }

        public void Stop()
        {
            resumeGame = false;
        }

        void InitTimeoutElement()
        {
            var ret = universeOutputUIElement.RangeElementTimeout;
            //ret.Min = "0";
            //ret.Max = "5000";
            ret.OnChange += delegate
            {
                universeOutputUIElement.TimeoutSpan.InnerHTML = ret.Value;
                timeout = Convert.ToInt32(ret.Value);
            };

        }

        void Initialize()
        {
            
            Window.OnResize += delegate
            {
                //screenSizeChanged = true;
                drawerUniverse.CalcScreenConsts();
                if (ConstsRedactorMessageDivBox != null)
                {
                    bool isOpened = ConstsRedactorMessageDivBox.IsOpened;
                    ConstsRedactorMessageDivBox.Close();
                    if (isOpened)
                        ConstsRedactorMessageDivBox.Show();
                }
            };
            
            //constsUniversePresenter = new ConstsUniversePresenter(universeOutputUIElement.ConstsUniverseRedactorElement, universe.ConstsUniverseProperty);
            universeOutputUIElement.ButtonStart.OnClick += delegate
            {
                Start();
            };
            universeOutputUIElement.ButtonStop.OnClick += delegate
            {
                Stop();
            };
            universeOutputUIElement.ButtonClearField.OnClick += delegate
            {
                universe.ClearField();
            };
            universeOutputUIElement.ButtonGenerateFoodOnAllField.OnClick += delegate
            {
                universe.GenerateFoodOnAllField();
            };

            universeOutputUIElement.ButtonCreateNewUniverse.OnClick += delegate
            {
                ShowUniverseCreationDialog();
            };
            universeOutputUIElement.ButtonСonstsUniverseRedactor.OnClick += delegate
            {
                ShowConstsUniverseRedactorDialog();
            };
            universeOutputUIElement.ButtonGenerateCells.OnClick += delegate
            {
                int tbValue;
                if (int.TryParse(universeOutputUIElement.TextBoxCellsCount.Value, out tbValue) && tbValue<300)
                {
                    universe.GenerateCells(tbValue);
                }
                else
                {
                    Window.Alert(LanguageHandler.Instance.CellsCountWarningMessage);
                }
            };
            InitTimeoutElement();
            
            
        }

        void CreateUniverseAndPresenters(int width, int height)
        {
            drawerUniverse = null;
            universeInfoPresenter = null;
            universe?.Dispose();
            universe = null;
            universe = new Universe( width,  height);
            CookieManager.Instance.SetValue("w", width);
            CookieManager.Instance.SetValue("h", height);
            drawerUniverse = new DrawerUniverse(universeOutputUIElement.Canvas, universe.Width, universe.Height);
            universeInfoPresenter = new UniverseInfoPresenter(universeOutputUIElement.UniverseInfoParagraph);

            //This code allow to update font size when drawer update size of canvas
            drawerUniverse.UniverseInfoFontSizeSetter += (fontSize) =>
            {
                universeInfoPresenter?.SetFontSize(fontSize);
                //Document.GetElementById("rightPanel").Style.FontSize = fontSize.ToString()+"px";
                Document.Body.Style.FontSize = fontSize.ToString() + "px";
            };
            
            drawerUniverse.CalcScreenConsts();
        }

        void ShowUniverseCreationDialog()
        {
            Stop();
            
            string idWidth = "id" + StableRandom.rd.Next(1000000, 9999999).ToString();
            string idHeight = "id" + StableRandom.rd.Next(1000000, 9999999).ToString();
            HTMLTableElement table = new HTMLTableElement();
            Tuple<int, int> widthAndHeight = GetDefaultUniverseSize();
            string rowWidth = string.Format("<tr><td>{0}</td><td><input type='text' id='{1}' value='{2}'></td></tr>",
                LanguageHandler.Instance.LabelWidthText,
                idWidth,
                widthAndHeight.Item1
                );
            string rowHeight = string.Format("<tr><td>{0}</td><td><input type='text' id='{1}' value='{2}'></td></tr>",
                LanguageHandler.Instance.LabelHeightText,
                idHeight,
                widthAndHeight.Item2
                );
            string html = string.Format("<table>{0}{1}</table>", rowWidth, rowHeight);

            table.InnerHTML = html;
            HTMLDivElement divContent = new HTMLDivElement();
            divContent.AppendChild(table);

            MessageDivBox msgBox = new MessageDivBox(divContent, MessageDivBoxButton.Ok | MessageDivBoxButton.Cancel);
            msgBox.RemoveAutomaticaly = false;
            msgBox.CallbackOnClose = (clickedButton) =>
              {
                  if (clickedButton == MessageDivBoxButton.Ok)
                  {
                      HTMLInputElement tbWidth = Document.GetElementById(idWidth) as HTMLInputElement;
                      HTMLInputElement tbHeight = Document.GetElementById(idHeight) as HTMLInputElement;
                      int width = -1, height = -1;
                      bool convertationRes = int.TryParse(tbWidth.Value, out width) && int.TryParse(tbHeight.Value, out height);
                      if (convertationRes && CheckUniverseSize(width, height))
                      {
                          msgBox.Remove();
                          CreateUniverseAndPresenters(width, height);
                          Start();
                      }
                      else
                      {
                          Window.Alert(LanguageHandler.Instance.UniverseSizeWarning);
                          msgBox.Show();
                      }
                  }
                  else
                  {
                      msgBox.Remove();
                      Start();
                      return;
                  }
              };

            msgBox.Show();
        }

        void ShowConstsUniverseRedactorDialog()
        {
            if (universe == null)
                return;

            resumeGameBuf = resumeGame;
            Stop();

            if (ConstsRedactorMessageDivBox == null || ConstsRedactorMessageDivBox.IsRemoved)
            {
                HTMLDivElement divContent = new HTMLDivElement();
                HTMLHeadingElement header = new HTMLHeadingElement(HeadingType.H4);
                header.InnerHTML = LanguageHandler.Instance.TitleOfUniverseConstsRedactor;
                header.ClassName = "consts-redactor-label";
                header.SetAttribute("align", "center");
                divContent.AppendChild(header);
                HTMLTableElement table = new HTMLTableElement();
                table.ClassName = "consts-redactor-table";

                divContent.AppendChild(table);
                ConstsUniversePresenter constsUniversePresenter = new ConstsUniversePresenter(divContent, universe.ConstsUniverseProperty);

                ConstsRedactorMessageDivBox = new MessageDivBox(divContent, MessageDivBoxButton.None);
                ConstsRedactorMessageDivBox.RemoveAutomaticaly = false;
                constsUniversePresenter.CallbackAfterSubmit = () =>
                {
                    ConstsRedactorMessageDivBox.Close();
                    if (resumeGameBuf)
                        Start();
                    ConstsRedactorMessageDivBox?.Remove();
                };
                ConstsRedactorMessageDivBox.CallbackOnClose = delegate
                {
                    if (resumeGameBuf)
                        Start();
                    ConstsRedactorMessageDivBox?.Remove();
                };
            }
            
            ConstsRedactorMessageDivBox.Show();
        }

        Tuple<int, int> GetDefaultUniverseSize()
        {
            int w=40, h=15;
            int.TryParse(CookieManager.Instance.GetValue("w").ToString(), out w);
            int.TryParse(CookieManager.Instance.GetValue("h").ToString(), out h);
            if (!CheckUniverseSize(w,h))
            {
                w = 40;
                h = 15;
            }
            return new Tuple<int, int>(w, h);
        }

        bool CheckUniverseSize(int width, int height)
        {
            return width >= 2 && width <= 200 && height >= 2 && height <= 200;
        }

        void Tick()
        {
            if (Window.Performance.Now() - windowTimePrev > timeout)
            {
                windowTimePrev = Window.Performance.Now();
                try
                {
                    universe.DoUniverseTick();
                    drawerUniverse.DrawFrame(universe.GetAllDescriptors());
                    //if (screenSizeChanged)
                    //{
                    //    screenSizeChanged = false;
                    //    drawerUniverse.CalcScreenConsts();
                    //}
                    universeInfoPresenter.WriteUniverseInfo(universe);
                }
                catch
                {
                }
            }

            if (resumeGame)
                Window.RequestAnimationFrame(Tick);
        }
    }
}
