using Bridge.Html5;

namespace TSS.SharpedJs
{
    interface IUniverseOutputUIElement
    {
        HTMLElement ButtonCreateNewUniverse { get; }
        HTMLElement ButtonStart { get; }
        HTMLElement ButtonStop { get; }
        HTMLElement ButtonClearField { get; }
        HTMLElement ButtonGenerateFoodOnAllField { get; }
        HTMLElement ButtonGenerateCells { get; }
        HTMLElement ButtonСonstsUniverseRedactor { get; }
        HTMLInputElement TextBoxCellsCount { get; }
        HTMLCanvasElement Canvas { get; }
        HTMLParagraphElement UniverseInfoParagraph { get; }
        //HTMLElement ConstsUniverseRedactorElement { get; }
        HTMLInputElement RangeElementTimeout { get; }
        HTMLSpanElement TimeoutSpan { get; }
    }
}
