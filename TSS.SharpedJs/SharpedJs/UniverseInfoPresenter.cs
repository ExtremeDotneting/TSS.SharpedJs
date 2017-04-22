using Bridge.Html5;

namespace TSS.SharpedJs
{
    class UniverseInfoPresenter
    {
        HTMLParagraphElement ParagraphElement;
        public UniverseInfoPresenter(HTMLParagraphElement paragraphElement)
        {
            ParagraphElement = paragraphElement;
            
        }

        public void SetFontSize(int fontSize)
        {
            ParagraphElement.Style.Font = string.Format("bold {0}px Courier New", fontSize);
        }

        public void WriteUniverseInfo(Universe universe)
        {
            string infoStr = (GetUniverseInfoString(universe) + "\n&emsp; &emsp;"+ GetCellInfoString(universe.GetMostFitCell()).Replace("\n", "\n&emsp;&emsp;"))
                .Replace("\n", "<br>").Replace("\t", "&emsp;&emsp;&emsp;&emsp;");
            ParagraphElement.InnerHTML = infoStr;
        }

        string GetUniverseInfoString(Universe universe)
        {
            int cellsCount = universe.GetCellsCount();
            long totalEnergy = universe.GetTotalUniverseEnergy();
            long tick = universe.GetTicksCount();
            int w = universe.Width;
            int h = universe.Height;
            int typesOfCellCount = universe.TypesOfCellsCount;

            string unInfoStr = string.Format(
                LanguageHandler.Instance.UniverseInfoStringFormatter,
                w, h, cellsCount, totalEnergy, tick, typesOfCellCount
                );
            
            return unInfoStr;
        }

        string GetCellInfoString(Cell cell)
        {
            int desc, hunger, aggression, reproduction,
                friendly, poisonAddiction, corpseAddiction, cellsCount;
            if (cell?.GetGenome() == null)
            {
                desc = 0;
                hunger = 0;
                aggression = 0;
                reproduction = 0;
                friendly = 0;
                poisonAddiction = 0;
                corpseAddiction = 0;
                cellsCount = -1;
            }
            else
            {
                desc = cell.GetDescriptor();
                hunger = cell.GetGenome().GetHunger();
                aggression = cell.GetGenome().GetAggression();
                reproduction = cell.GetGenome().GetReproduction();
                friendly = cell.GetGenome().GetFriendly();
                poisonAddiction = cell.GetGenome().GetPoisonAddiction();
                corpseAddiction = cell.GetGenome().GetCorpseAddiction();
                cellsCount = cell?.GetCellsCountWithThisDescriptor() ?? -1; //-V3022
            }

            string cellInfoStr = string.Format(
                LanguageHandler.Instance.CellInfoStringFormatter,
                hunger, aggression, reproduction, friendly, poisonAddiction, corpseAddiction, cellsCount
                );

            string color = GraphicsHelper.CssColorFromInt(desc);
            cellInfoStr += string.Format("<span style=\"color:{0}\"> {0}</span>", color);
            return cellInfoStr;
        }

        
    }
}
