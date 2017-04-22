using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge;
using Bridge.Html5;
using System.Reflection;

namespace TSS.SharpedJs
{
    class ConstsUniversePresenter : IDisposable
    {

        bool isOpened = false;        
        HTMLTableElement redactorTable;

        ConstsUniverse ConstsUniverse { get; set; }
        public Action CallbackAfterSubmit { get; set; }
        public HTMLElement DetailsElement { get; private set; }

        public ConstsUniversePresenter(HTMLElement detailsElement, ConstsUniverse constsUniverse)
        {
            ConstsUniverse = constsUniverse;
            DetailsElement = detailsElement;
            //DetailsElement.GetElementsByClassName("consts-redactor-label")[0].InnerHTML = LanguageHandler.Instance.TitleOfUniverseConstsRedactor;
            redactorTable = DetailsElement.GetElementsByClassName("consts-redactor-table")[0] as HTMLTableElement;
            DetailsElement.OnClick = (me) =>
              {
                  isOpened = !DetailsElement.HasAttribute("open");
              };
            HTMLButtonElement acceptButton = new HTMLButtonElement();
            acceptButton.TextContent = LanguageHandler.Instance.ApplyButtonText;
            acceptButton.SetAttribute("align","left");
            
            acceptButton.OnClick = (me) =>
            {
                Submit();
            };
            DetailsElement.AppendChild(acceptButton);
            DetailsElement.SetAttribute("align", "left");
            InitRedactorTable(constsUniverse, redactorTable);
            redactorTable.OnKeyDown += (sender) =>
            {
                if (sender.KeyCode == 13)
                    Submit();
            };
        }

        void Submit()
        {
            ReadValuesToObject(ConstsUniverse, redactorTable);
            ConstsUniverse.SaveToCookies();
            CallbackAfterSubmit?.Invoke();
            //DetailsElement.RemoveAttribute("open");
        }
        void InitRedactorTable(object objectWithFields, HTMLTableElement table)
        {
            string tableHtml = "";
            Type objType = objectWithFields.GetType();
            foreach (var fieldInfo in objType.GetFields(BindingFlags.Default | BindingFlags.FlattenHierarchy | BindingFlags.DeclaredOnly |
                BindingFlags.Instance | BindingFlags.Public | BindingFlags.Static))
            {

                //tableHtml += CreateRow(objectWithFields, objType.GetField("CellGenome_HungerRange"));
                tableHtml += CreateRow(objectWithFields, fieldInfo);
            }
            table.InnerHTML = tableHtml;
        }
        string CreateRow(object objectWithFields, FieldInfo fieldInfo)
        {
            string htmlRes = "";
            if (typeof(IFormattable).IsAssignableFrom(fieldInfo.FieldType) || typeof(bool).IsAssignableFrom(fieldInfo.FieldType))
            {
                Type fieldType = fieldInfo.FieldType;
                object fieldValue = fieldInfo.GetValue(objectWithFields);

                NumericValuesAttribute atr = null;
                try
                {
                    atr = fieldInfo.GetCustomAttributes(typeof(NumericValuesAttribute))[0] as NumericValuesAttribute;
                }
                catch { }
                string htmlToPresentField = "error";

                if (typeof(bool).IsAssignableFrom(fieldInfo.FieldType))
                {
                    string checkBoxState = Convert.ToBoolean(fieldValue) ? "checked" : "";
                    htmlToPresentField = string.Format("<input type='checkbox' class='{0}' {1}>", fieldInfo.Name, checkBoxState);
                    //bool
                }
                else if (atr == null)
                {
                    htmlToPresentField = string.Format(
                        "<input type='text'  class='{0}' value='{1}'>",
                        fieldInfo.Name,
                        Convert.ToString(fieldValue)
                        );
                    //use textBox
                }
                else if (atr.WayToShow == NumericValuesWayToShow.Default)
                {
                    htmlToPresentField = string.Format(
                       "<input type='text' class='{0}' value='{1}' custom_min='{2}' custom_max='{3}' is_num>",
                        fieldInfo.Name,
                        Convert.ToString(fieldValue),
                        atr.Min,
                        atr.Max
                        );
                    //use textBox and max min
                }
                else if (atr.WayToShow == NumericValuesWayToShow.Slider)
                {
                    string format = "<input type='range' class='{0}' value='{1}' min='{2}' max='{3}' custom_min='{2}' custom_max='{3}' " +
                        "onchange='document.getElementById(\"{4}\").innerHTML=this.value;'><span id={4}>{1}</span>";
                    string spanId = "spanId" + StableRandom.rd.Next(1000000, 9999999).ToString();
                    htmlToPresentField = string.Format(
                        format,
                        fieldInfo.Name,
                        Convert.ToString(fieldValue),
                        atr.Min,
                        atr.Max,
                        spanId
                        );
                    //use textBox and max min
                }
                else
                {
                    throw new Exception("Don`t know how to show field " + fieldInfo.Name + ".");
                }

                htmlRes = string.Format("<tr><td>{0}</td><td>{1}</td></tr>", fieldInfo.Name, htmlToPresentField);
            }
            return htmlRes;
        }
        void ReadValuesToObject(object objectWithFields, HTMLTableElement table)
        {
            Dictionary<string, object> bufForValues = new Dictionary<string, object>();
            Type objType = objectWithFields.GetType();
            foreach (var fieldInfo in objType.GetFields(BindingFlags.Default | BindingFlags.FlattenHierarchy | BindingFlags.DeclaredOnly |
                BindingFlags.Instance | BindingFlags.Public | BindingFlags.Static))
            {
                HTMLInputElement inputElement = redactorTable.GetElementsByClassName(fieldInfo.Name)[0] as HTMLInputElement;
                object fieldValue = null;
                try
                {
                    fieldValue = TryGetValue(inputElement, fieldInfo);
                }
                catch (Exception ex)
                {
                    if (typeof(ParsebleException).IsAssignableFrom(ex.GetType()) && (ex as ParsebleException).MessageForUser != null)
                        Window.Alert((ex as ParsebleException).MessageForUser);
                    else
                        Window.Alert(string.Format(LanguageHandler.Instance.IncorrectValueMsg, fieldInfo.Name));
                    inputElement.Focus();

                    throw;
                }
                bufForValues.Add(fieldInfo.Name, fieldValue);
            }
            foreach (var fieldInfo in objType.GetFields(BindingFlags.Default | BindingFlags.FlattenHierarchy | BindingFlags.DeclaredOnly |
                BindingFlags.Instance | BindingFlags.Public | BindingFlags.Static))
            {
                object fieldValue = bufForValues[fieldInfo.Name];
                fieldInfo.SetValue(objectWithFields, fieldValue);
            }
            InitRedactorTable(objectWithFields, table);
        }
        object TryGetValue(HTMLInputElement inputElement, FieldInfo fieldInfo)
        {
            object res = null;
            if (inputElement.Type == InputType.Checkbox)
            {
                res = inputElement.Checked;
            }
            else if (inputElement.Type == InputType.Range)
            {
                res = Convert.ToDouble(inputElement.Value);
            }
            else if (fieldInfo.FieldType.GetCustomAttributes(typeof(ParsebleAttribute), true).Length > 0)
            {
                res = ParsebleAttribute.Parse(inputElement.Value, fieldInfo.FieldType);
            }
            else if (inputElement.HasAttribute("is_num"))
            {
                double resMaybe = Convert.ToDouble(inputElement.Value);
                if (inputElement.HasAttribute("custom_min"))
                {
                    double min = Convert.ToDouble(inputElement.GetAttribute("custom_min"));
                    double max = Convert.ToDouble(inputElement.GetAttribute("custom_max"));
                    if (max > min && (resMaybe < min || resMaybe > max))
                        throw new ParsebleException(
                            "Value not in range!",
                            string.Format(LanguageHandler.Instance.IncorrectRangeMsg, fieldInfo.Name, min, max)
                            );
                }
                res = resMaybe;
            }
            else
            {
                res = inputElement.Value;
            }
            return res;
        }

        public void Dispose()
        {
            ConstsUniverse = null ;
            redactorTable=null;
            DetailsElement=null;
        }
    }
}
