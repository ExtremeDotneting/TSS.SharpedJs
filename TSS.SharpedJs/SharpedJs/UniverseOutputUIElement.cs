using Bridge.Html5;

namespace TSS.SharpedJs
{
    class UniverseOutputUIElement : IUniverseOutputUIElement
    {
        public HTMLElement ButtonCreateNewUniverse { get; private set; }
        public HTMLElement ButtonStart { get; private set; }
        public HTMLElement ButtonStop { get; private set; }
        public HTMLElement ButtonClearField { get; private set; }
        public HTMLElement ButtonGenerateFoodOnAllField { get; private set; }
        public HTMLElement ButtonGenerateCells { get; private set; }
        public HTMLElement ButtonСonstsUniverseRedactor { get; private set; }
        public HTMLInputElement TextBoxCellsCount { get; private set; }
        public HTMLCanvasElement Canvas { get; private set; }
        public HTMLParagraphElement UniverseInfoParagraph { get; private set; }
        //public HTMLElement ConstsUniverseRedactorElement { get; private set; }
        public HTMLInputElement RangeElementTimeout { get; private set; }
        public HTMLSpanElement TimeoutSpan { get; private set; }

        static UniverseOutputUIElement defInstance;
        public static UniverseOutputUIElement DefInstance
        {
            get
            {
                if (defInstance == null)
                {
                    defInstance = new UniverseOutputUIElement();
                    defInstance.ButtonCreateNewUniverse=Document.GetElementById("createUniverseButton");
                    defInstance.ButtonStart = Document.GetElementById("startButton");
                    defInstance.ButtonStop = Document.GetElementById("stopButton");
                    defInstance.ButtonClearField = Document.GetElementById("clearFieldButton");
                    defInstance.ButtonGenerateFoodOnAllField = Document.GetElementById("genFoodButton");
                    defInstance.ButtonGenerateCells = Document.GetElementById("genCellsButton");
                    defInstance.ButtonСonstsUniverseRedactor =Document.GetElementById("сonstsUnRedactorOpen");
                    defInstance.TextBoxCellsCount = Document.GetElementById("genCellsCountTextBox") as HTMLInputElement;
                    defInstance.Canvas = Document.GetElementById("universeCanvas") as HTMLCanvasElement;
                    defInstance.UniverseInfoParagraph = Document.GetElementById("universeInfoParagraph") as HTMLParagraphElement;
                    defInstance.RangeElementTimeout = Document.GetElementById("timeoutSlider") as HTMLInputElement;
                    defInstance.TimeoutSpan = Document.GetElementById("timeoutSpanId") as HTMLSpanElement;
                }
                return defInstance;
            }
        }

    }
}
