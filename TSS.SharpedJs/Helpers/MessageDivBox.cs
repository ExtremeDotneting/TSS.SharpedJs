using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TSS.SharpedJs
{
    [Flags]
    enum MessageDivBoxButton {
        Ok=1,
        Cancel=2,
        None=8
    }

    delegate void CallbackBeforeClose(MessageDivBoxButton clickedButton);

    class MessageDivBox
    {
        HTMLDivElement modalMainDivField;

        public CallbackBeforeClose CallbackOnClose { get; set; }
        public bool IsRemoved { get; private set; } = false;
        public bool IsOpened { get; private set; } = false;
        public bool RemoveAutomaticaly { get; set; } = true;

        public MessageDivBox(HTMLDivElement msgDiv, MessageDivBoxButton buttonsFlag)
        {
            Initialize(msgDiv, buttonsFlag);
        }

        public MessageDivBox(string msgHtml)
        {
            var msgDiv = new HTMLDivElement();
            msgDiv.InnerHTML = msgHtml;
            Initialize(msgDiv, MessageDivBoxButton.Ok);
        }

        public MessageDivBox(string msgHtml, MessageDivBoxButton buttonsFlag)
        {
            var msgDiv = new HTMLDivElement();
            msgDiv.InnerHTML = msgHtml;
            Initialize(msgDiv, buttonsFlag);
        }

        void Initialize(HTMLDivElement msgDiv, MessageDivBoxButton buttonsFlag)
        {
            var modalMainDiv = new HTMLDivElement();
            modalMainDivField = modalMainDiv;
            modalMainDiv.ClassName = "modal";
            modalMainDiv.SetAttribute("align", "center");
            HTMLDivElement modalContenDiv = msgDiv;
            modalContenDiv.ClassName = "modal-content";
            var span = new HTMLSpanElement();
            span.InnerHTML = "&times;";
            span.ClassName = "close-modal";
            HTMLDivElement divHeader = new HTMLDivElement();
            divHeader.AppendChild(span);
            divHeader.ClassName = "modal-header";
            modalContenDiv.InsertBefore(divHeader, modalContenDiv.FirstChild);
            //modalMainDiv.AppendChild(divHeader);
            modalMainDiv.AppendChild(modalContenDiv);

            HTMLDivElement footerDiv = CreateButtonsDiv(buttonsFlag);
            if(footerDiv!=null)
                modalContenDiv.AppendChild(footerDiv);

            Close();
            Document.Body.AppendChild(modalMainDiv);

            span.OnClick += delegate
            {
                Close();

                CallbackOnClose?.Invoke(MessageDivBoxButton.Cancel);
                if (RemoveAutomaticaly)
                    Remove();
            };
        }

        HTMLDivElement CreateButtonsDiv(MessageDivBoxButton buttonsFlag)
        {
            if (buttonsFlag.HasFlag(MessageDivBoxButton.None))
                return null;

            HTMLDivElement res = new HTMLDivElement();
            res.ClassName = "modal-footer";
            res.SetAttribute("align", "left");
            HTMLTableElement buttonsTable= new HTMLTableElement();
            res.AppendChild(buttonsTable);
            HTMLTableRowElement buttonsRow = new HTMLTableRowElement();
            buttonsTable.AppendChild(buttonsRow);

            if (buttonsFlag.HasFlag(MessageDivBoxButton.Ok))
            {
                buttonsRow.AppendChild(CreateButton(LanguageHandler.Instance.ButtonOk, MessageDivBoxButton.Ok));
            }
            if (buttonsFlag.HasFlag(MessageDivBoxButton.Cancel))
            {
                buttonsRow.AppendChild(CreateButton(LanguageHandler.Instance.ButtonCancel, MessageDivBoxButton.Cancel));
            }
            return res;
        }

        HTMLTableDataCellElement CreateButton(string caption, MessageDivBoxButton buttonDesc)
        {
            HTMLTableDataCellElement res = new HTMLTableDataCellElement();
            
            HTMLButtonElement button = new HTMLButtonElement();
            button.TextContent = caption;
            button.OnClick += delegate
            {
                Close();

                CallbackOnClose?.Invoke(buttonDesc);
                if (RemoveAutomaticaly)
                    Remove();
            };
            button.Style.Margin = "10px 10px 0px 0px";
            res.AppendChild(button);
            return res;
        }


        /// <summary>
        /// Not block calling thread.
        /// </summary>
        public void Show()
        {
            if (IsRemoved)
                return;
            IsOpened = true;
            modalMainDivField.Style.Display = Display.Block;
        }

        public void Close()
        {
            if (IsRemoved)
                return;
            IsOpened = false;
            modalMainDivField.Style.Display = Display.None;
        }

        public void Remove()
        {
            if (IsRemoved)
                return;
            Close();
            IsRemoved = true;
            modalMainDivField.Remove();
        }

    }
}
