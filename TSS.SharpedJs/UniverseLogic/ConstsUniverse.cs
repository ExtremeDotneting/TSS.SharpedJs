using Bridge.Html5;
using System;
using TSS.SharpedJs;
using TSS.SharpedJs;

namespace TSS.SharpedJs
{
    /// <summary>
    /// The values used to calculate the processes in the universe (game). Their change - the basic essence of the gameplay.
    /// Attributes such as [NumericValues(1, 200)] used in ValuesRedactor giving him an idea of how you can edit this field.
    /// <para></para>
    /// Значения, используемые для расчета процессов во вселенной (игры). Их изменение - основная суть геймплея.
    /// Атрибуты типа[NumericValues(1, 200)] используются в ValuesRedactor давая ему представление о том как можно редактировать данное поле.
    /// </summary>
    class ConstsUniverse
    {
        ConstsUniverse()
        {
        }

        public static ConstsUniverse Create()
        {
            if (CookieManager.Instance.ContainsCookie("universe_consts_saved"))
            {
                return JSON.Parse<ConstsUniverse>(
                    Convert.ToString(CookieManager.Instance.GetValue("universe_consts_saved"))
                    );
            }
            else
            {
                return new ConstsUniverse();
            }
        }

        public void SaveToCookies()
        {
            CookieManager.Instance.SetValue("universe_consts_saved",JSON.Stringify(this));
        }

        [NoInfoAttribute]
        public int MaxCountOfCellTypes = 10000;
        [NoInfoAttribute]
        public bool Mutation_Enable = true;
        [NoInfoAttribute]
        public bool Mutation_AttackChildrenMutantsOfFirstGeneration = false;
        [NoInfoAttribute]
        public bool Mutation_AttackParentIfCellIsYouMutant = true;
        [NumericValues(1, 200)]
        public int Mutation_ChangedValuesAtOne = 40;
        [NumericValuesAttribute(0, 100, NumericValuesWayToShow.Slider)]
        public int Mutation_ChancePercent = 5;
        [NumericValues(int.MinValue, int.MaxValue)]
        public int CellAge_Max = 100;
        [NumericValues(int.MinValue, int.MaxValue)]
        public int CellAge_AdultCell = 20;
        [NumericValues(float.MinValue, float.MaxValue)]
        public float EnergyLevel_CreatingCell = 225;
        [NumericValues(float.MinValue, float.MaxValue)]
        public float EnergyLevel_NeededForReproduction = 200;
        [NumericValues(float.MinValue, float.MaxValue)]
        public float EnergyLevel_MaxForCell = 500;
        [NumericValues(float.MinValue, float.MaxValue)]
        public float EnergyLevel_DeadCell = 10;
        [NumericValues(float.MinValue, float.MaxValue)]
        public float EnergyLevel_DefFood = 20;
        [NumericValues(float.MinValue, float.MaxValue)]
        public float EnergyLevel_PoisonedFood = -100;
        [NumericValues(float.MinValue, float.MaxValue)]
        public float EnergyLevel_MovesFriendly = 1;
        [NumericValues(float.MinValue, float.MaxValue)]
        public float EnergyLevel_MovesAggression = 50;
        [NumericValues(int.MinValue, int.MaxValue)]
        public int CellsCount_MaxWithOneType = 900000;
        [NumericValues(int.MinValue, int.MaxValue)]
        public int CellGenome_Child_Aggression=-2;
        [NumericValues(int.MinValue, int.MaxValue)]
        public int CellsCount_MaxAtField = 2500000;
        [NumericValues(-99999, 99999)]
        public float EnergyEntropyPerSecond = 1;
        [NumericValues(0, 30000)]
        public int Special_FoodCountForTick = 2;
        [NumericValues(0, 30000)]
        public int Special_PoisonCountForTick = 20;


        //Genome
        [NoInfoAttribute]
        MinMaxInt CellGenome_HungerRange = new MinMaxInt(-10,10);
        [NoInfoAttribute]
        MinMaxInt CellGenome_AggressionRange = new MinMaxInt(-10, 10);
        [NoInfoAttribute]
        MinMaxInt CellGenome_ReproductionRange = new MinMaxInt(-10, 10);
        [NoInfoAttribute]
        MinMaxInt CellGenome_FriendlyRange = new MinMaxInt(-10, 10);
        [NoInfoAttribute]
        MinMaxInt CellGenome_PoisonRange = new MinMaxInt(-10, 10);
        [NoInfoAttribute]
        MinMaxInt CellGenome_CorpseRange = new MinMaxInt(-10, 10);
        //Genome

        public int CellGenome_Hunger
        {
            get { return RandomFromRange(CellGenome_HungerRange.Min, CellGenome_HungerRange.Max); }
        }
        public int CellGenome_Aggression
        {
            get { return RandomFromRange(CellGenome_AggressionRange.Min, CellGenome_AggressionRange.Max); }
        }
        public int CellGenome_Reproduction
        {
            get { return RandomFromRange(CellGenome_ReproductionRange.Min, CellGenome_ReproductionRange.Max); }
        }
        public int CellGenome_Friendly
        {
            get { return RandomFromRange(CellGenome_FriendlyRange.Min, CellGenome_FriendlyRange.Max); }
        }
        public int CellGenome_PoisonAddiction
        {
            get { return RandomFromRange(CellGenome_PoisonRange.Min, CellGenome_PoisonRange.Max); }
        }
        public int CellGenome_CorpseAddiction
        {
            get { return RandomFromRange(CellGenome_CorpseRange.Min, CellGenome_CorpseRange.Max); }
        }
        int RandomFromRange(int minValue, int maxValue)
        {
            if (minValue >= maxValue)
                return minValue;
            else
                return StableRandom.rd.Next(minValue, maxValue);
        }

        

    }

}
