Bridge.assembly("TSS.SharpedJs", function ($asm, globals) {
    "use strict";

    /** @namespace TSS.UniverseLogic */

    /**
     * Universe class use it.
     <p />
     Интерфейс используется Universe.
     *
     * @abstract
     * @class TSS.UniverseLogic.IHasEnergy
     */
    Bridge.define("TSS.UniverseLogic.IHasEnergy", {
        $kind: "interface"
    });

    /**
     * An important part of the gaming universe.
     <p />
     ��������� ����� ������� ���������.
     *
     * @abstract
     * @class TSS.UniverseLogic.UniverseObject
     * @implements  System.IDisposable
     */
    Bridge.define("TSS.UniverseLogic.UniverseObject", {
        inherits: [System.IDisposable],
        descriptor: 0,
        x: -1,
        y: -1,
        constsUniverse: null,
        config: {
            alias: [
            "dispose", "System$IDisposable$dispose"
            ]
        },
        ctor: function (constsUniverse) {
            this.$initialize();
            this.setConstsUniverseProperty(constsUniverse);
        },
        getConstsUniverseProperty: function () {
            return this.constsUniverse;
        },
        setConstsUniverseProperty: function (value) {
            this.constsUniverse = value;
        },
        setCords: function (x, y) {
            this.x = x;
            this.y = y;
        },
        getX: function () {
            return this.x;
        },
        getY: function () {
            return this.y;
        },
        /**
         * A very important element of the whole system - a descriptor of UniverseObject. It is used to obtain information about an object in the simplest way.
         Each child class has his own. Food: -1, -2, -3; Cell: 100+. It contains information not only about the type,
         but also the object itself. For example, Food it shows what this type of food for the Cell,
         he is also an identifier of its genome (now, after completion of the project, I understand that it was logical to make GetDescriptor abstract,
         to the descendants themselves decide how to implement it. Then would be the ability to store in his cell genome,
         it would have saved a lot of problems.). Cells use it to make decisions about movement, engine - learns how to draw object.
         By the way, the remote default method Dispose object has a handle of 0.
         <p />
         ����� ������ ������� ���� ������� - ��� ���������� UniverseObject. �� ������������ ��� ��������� �������� �� ������� ����� ������� �����.
         � ������� ��������� ������ �� ����. � Food: -1,-2,-3; Cell: 100+. �� ����� ���������� �� ������ � ����, �� � � ����� �������.
         ��������, ��� Food �� ���������� ��� ��� �� ��� ���, ��� Cell �� �������� ��� � ��������������� �� ������
         (������, ����� ���������� ������� � �������, ��� �������� ���� ������� GetDescriptor �����������, ���� ������� ���� ������
         ��� ��� �������������. ����� ���� �� ����������� ������� ��� � ������ ������, ��� �������� �� �� ������ �������.).
         ������ ���������� ��� ��� �������� ������� � ��������, ������ - ������ ��� ������������ ������. ������, ��������� ������� Dispose
         ������ �� ��������� ����� ���������� ������ 0.
         *
         * @instance
         * @public
         * @this TSS.UniverseLogic.UniverseObject
         * @memberof TSS.UniverseLogic.UniverseObject
         * @return  {number}
         */
        getDescriptor: function () {
            return this.descriptor;
        },
        dispose: function () {
            this.descriptor = 0;
        },
        isDisposed: function () {
            return (this.descriptor === 0);
        }
    });

    /**
     * This local type and a field used to count the number of cells with such a descriptor.
     Its essence is that all of the cells with the descriptor has a pointer to a memory area.
     So, as each cell creating / deleting change this number, we do not need exhaustive search, to count the number of cells with the genome.
     This makes the algorithm fast but unreliable, alas.
     <p />
     ���� ��������� ��� � ���� ������������ ��� �������� ���������� ������ � ����� ������������.
     ��� ���� � ���, ��� ��� ������ � ����� ������������ ����� ��������� �� ���� ������� ������.
     ���-��� ������ ������ ��� ��������/�������� ������ ��� �����, �� �� ��������� � ������ ��������, ��� �������� ���������� ������ � ����� �������.
     ��� ������ �������� �������, �� ����������, ���.
     *
     * @private
     * @class TSS.UniverseLogic.Cell.LinkedInt
     */
    Bridge.define("TSS.UniverseLogic.Cell.LinkedInt", {
        value: 1
    });

    /**
     * The values used to calculate the processes in the universe (game). Their change - the basic essence of the gameplay.
     Attributes such as [NumericValues(1, 200)] used in ValuesRedactor giving him an idea of how you can edit this field.
     <p />
     Значения, используемые для расчета процессов во вселенной (игры). Их изменение - основная суть геймплея.
     Атрибуты типа[NumericValues(1, 200)] используются в ValuesRedactor давая ему представление о том как можно редактировать данное поле.
     *
     * @class TSS.UniverseLogic.ConstsUniverse
     */
    Bridge.define("TSS.UniverseLogic.ConstsUniverse", {
        maxCountOfCellTypes: 10,
        mutation_Enable: true,
        mutation_AttackChildrenMutantsOfFirstGeneration: false,
        mutation_AttackParentIfCellIsYouMutant: false,
        mutation_ChangedValuesAtOne: 1,
        mutation_ChancePercent: 10,
        cellAge_Max: 99999,
        cellAge_AdultCell: 25,
        energyLevel_CreatingCell: 125,
        energyLevel_NeededForReproduction: 100,
        energyLevel_MaxForCell: 1000,
        energyLevel_DeadCell: 20,
        energyLevel_DefFood: 10,
        energyLevel_PoisonedFood: -10,
        energyLevel_MovesFriendly: 1,
        energyLevel_MovesAggression: 5,
        cellsCount_MaxWithOneType: 9000,
        cellGenome_Child_Aggression: -2,
        cellsCount_MaxAtField: 250,
        energyEntropyPerSecond: 1,
        special_FoodCountForTick: 2,
        special_PoisonCountForTick: 2,
        cellGenome_HungerRange: null,
        cellGenome_AggressionRange: null,
        cellGenome_ReproductionRange: null,
        cellGenome_FriendlyRange: null,
        cellGenome_PoisonRange: null,
        cellGenome_CorpseRange: null,
        config: {
            init: function () {
                this.cellGenome_HungerRange = new TSS.Helpers.MinMaxInt.$ctor1(-10, 10);
                this.cellGenome_AggressionRange = new TSS.Helpers.MinMaxInt.$ctor1(-10, 10);
                this.cellGenome_ReproductionRange = new TSS.Helpers.MinMaxInt.$ctor1(-10, 10);
                this.cellGenome_FriendlyRange = new TSS.Helpers.MinMaxInt.$ctor1(-10, 10);
                this.cellGenome_PoisonRange = new TSS.Helpers.MinMaxInt.$ctor1(-10, 10);
                this.cellGenome_CorpseRange = new TSS.Helpers.MinMaxInt.$ctor1(-10, 10);
            }
        },
        ctor: function () {
            this.$initialize();
            //Попытка загрузить значения из файла.
            //Try load values from file.
        },
        getCellGenome_Hunger: function () {
            return this.randomFromRange(this.cellGenome_HungerRange.min, this.cellGenome_HungerRange.max);
        },
        getCellGenome_Aggression: function () {
            return this.randomFromRange(this.cellGenome_AggressionRange.min, this.cellGenome_AggressionRange.max);
        },
        getCellGenome_Reproduction: function () {
            return this.randomFromRange(this.cellGenome_ReproductionRange.min, this.cellGenome_ReproductionRange.max);
        },
        getCellGenome_Friendly: function () {
            return this.randomFromRange(this.cellGenome_FriendlyRange.min, this.cellGenome_FriendlyRange.max);
        },
        getCellGenome_PoisonAddiction: function () {
            return this.randomFromRange(this.cellGenome_PoisonRange.min, this.cellGenome_PoisonRange.max);
        },
        getCellGenome_CorpseAddiction: function () {
            return this.randomFromRange(this.cellGenome_CorpseRange.min, this.cellGenome_CorpseRange.max);
        },
        saveToFile: function () {
            //File.WriteAllLines(DefaultConfigFile, SerializeHandler.FieldValuesToXml(this).ToString().Split('\n'));
        },
        randomFromRange: function (minValue, maxValue) {
            if (minValue >= maxValue) {
                return minValue;
            } else {
                return TSS.Another.StableRandom.rd.next$2(minValue, maxValue);
            }
        }
    });

    Bridge.define("TSS.UniverseLogic.FoodType", {
        $kind: "enum",
        statics: {
            poison: 0,
            deadCell: 1,
            defaultFood: 2
        }
    });

    /**
     * Storage of cell data.
     <p />
     ��������� ������ � ������.
     *
     * @class TSS.UniverseLogic.Genome
     */
    Bridge.define("TSS.UniverseLogic.Genome", {
        hunger: 0,
        aggression: 0,
        reproduction: 0,
        friendly: 0,
        poisonAddiction: 0,
        corpseAddiction: 0,
        ctor: function (hunger, aggression, reproduction, friendly, poisonAddiction, corpseAddiction) {
            this.$initialize();
            this.hunger = hunger;
            this.aggression = aggression;
            this.reproduction = reproduction;
            this.friendly = friendly;
            this.poisonAddiction = poisonAddiction;
            this.corpseAddiction = corpseAddiction;
        },
        $ctor1: function (constsUniverse) {
            TSS.UniverseLogic.Genome.ctor.call(this, constsUniverse.getCellGenome_Hunger(), constsUniverse.getCellGenome_Aggression(), constsUniverse.getCellGenome_Reproduction(), constsUniverse.getCellGenome_Friendly(), constsUniverse.getCellGenome_PoisonAddiction(), constsUniverse.getCellGenome_CorpseAddiction());
        },
        getHunger: function () {
            return this.hunger;
        },
        getAggression: function () {
            return this.aggression;
        },
        getReproduction: function () {
            return this.reproduction;
        },
        getFriendly: function () {
            return this.friendly;
        },
        getPoisonAddiction: function () {
            return this.poisonAddiction;
        },
        getCorpseAddiction: function () {
            return this.corpseAddiction;
        },
        /**
         * This method just clone genome.
         <p />
         ���� ����� ������ ��������� �����.
         *
         * @instance
         * @public
         * @this TSS.UniverseLogic.Genome
         * @memberof TSS.UniverseLogic.Genome
         * @return  {TSS.UniverseLogic.Genome}
         */
        clone: function () {
            return new TSS.UniverseLogic.Genome.ctor(this.hunger, this.aggression, this.reproduction, this.friendly, this.poisonAddiction, this.corpseAddiction);
        },
        /**
         * This method clone genome and change some values.
         <p />
         ���� ����� ��������� �����, ������� ��������� ��� ��������.
         *
         * @instance
         * @public
         * @this TSS.UniverseLogic.Genome
         * @memberof TSS.UniverseLogic.Genome
         * @param   {number}                      Mutation_ChangedValuesAtOne
         * @return  {TSS.UniverseLogic.Genome}
         */
        cloneAndMutate: function (Mutation_ChangedValuesAtOne) {
            var modificator;
            var hunger = this.hunger, aggression = this.aggression, reproduction = this.reproduction, friendly = this.friendly;

            for (var i = 0; i < Mutation_ChangedValuesAtOne; i = (i + 1) | 0) {
                if (TSS.Another.StableRandom.rd.next$1(2) === 0) {
                    modificator = -1;
                } else {
                    modificator = 1;
                }
                switch (TSS.Another.StableRandom.rd.next$2(1, 7)) {
                    case 1: 
                        hunger = (hunger + modificator) | 0;
                        break;
                    case 2: 
                        aggression = (aggression + modificator) | 0;
                        break;
                    case 3: 
                        reproduction = (reproduction + modificator) | 0;
                        break;
                    case 4: 
                        friendly = (friendly + modificator) | 0;
                        break;
                    case 5: 
                        this.poisonAddiction = (this.poisonAddiction + modificator) | 0;
                        break;
                    case 6: 
                        this.corpseAddiction = (this.corpseAddiction + modificator) | 0;
                        break;
                }

            }
            return new TSS.UniverseLogic.Genome.ctor(hunger, aggression, reproduction, friendly, this.poisonAddiction, this.corpseAddiction);
        }
    });

    Bridge.define("TSS.UniverseLogic.MoveDirection", {
        $kind: "enum",
        statics: {
            stand: 0,
            up: 1,
            down: 2,
            left: 3,
            right: 4
        }
    });

    /** @namespace System */

    /**
     * @memberof System
     * @callback System.Action
     * @return  {void}
     */

    /**
     * There is the whole gameplay in this class.
     <p />
     � ���� ������ ���������� ���� ������� �������.
     *
     * @class TSS.UniverseLogic.Universe
     */
    Bridge.define("TSS.UniverseLogic.Universe", {
        totalUniverseEnergy: System.Int64(0),
        /**
         * The matrix that stores all of the objects of the game field.
         <p />
         ������� � ������� �������� ��� ������� �������� ����.
         *
         * @instance
         */
        universeMatrix: null,
        poisonPlace: null,
        foodPlace: null,
        /**
         * This list contains all of the cells for quick access to them.
         <p />
         � ���� ������ �������� ��� ������ ��� �������� ������� � ���.
         *
         * @instance
         */
        cellList: null,
        width: 0,
        height: 0,
        ticksCount: System.Int64(0),
        mostFitGenome_OneCell: null,
        constsUniverse: null,
        disposed: false,
        invokedActions: null,
        typesOfCellsCount: 0,
        config: {
            init: function () {
                this.cellList = new (System.Collections.Generic.List$1(TSS.UniverseLogic.Cell))(0);
                this.invokedActions = new (System.Collections.Generic.List$1(Function))();
            }
        },
        ctor: function (width, height) {
            this.$initialize();
            this.width = width;
            this.height = height;
            this.foodPlace = System.Array.create(false, null, Boolean, width, height);
            this.poisonPlace = System.Array.create(false, null, Boolean, width, height);
            this.setDefaultObjectsAccessiblePlace();
            this.setConstsUniverseProperty(new TSS.UniverseLogic.ConstsUniverse());
            this.universeMatrix = System.Array.create(null, null, TSS.UniverseLogic.UniverseObject, width, height);
            this.ticksCount = System.Int64(0);
        },
        getConstsUniverseProperty: function () {
            return this.constsUniverse;
        },
        setConstsUniverseProperty: function (value) {
            this.constsUniverse = value;
        },
        getHeight: function () {
            return this.height;
        },
        getWidth: function () {
            return this.width;
        },
        getTypesOfCellsCount: function () {
            return this.typesOfCellsCount;
        },
        setTypesOfCellsCount: function (value) {
            this.typesOfCellsCount = value;
        },
        dispose: function () {
            this.disposed = true;
            for (var i = 0; i < this.width; i = (i + 1) | 0) {
                for (var j = 0; j < this.height; j = (j + 1) | 0) {
                    this.getMatrixElement(i, j).dispose();
                }
            }
            this.universeMatrix = null;
            this.poisonPlace = null;
            this.foodPlace = null;
            this.cellList = null;
            this.mostFitGenome_OneCell = null;
            this.constsUniverse = null;
            this.invokedActions = null;
        },
        isDisposed: function () {
            return this.disposed;
        },
        /**
         * By calling this method, you spend all the calculations in the universe (game).
         They are held only here, it will make for reliable operation and synchronization of the entire system.
         <p />
         ������� ���� ����� �� ��������� ��� ���������� �� ���������(����).
         ��� ���������� ������ �����, ��� �������� ��� ���������� ������ � ������������� ���� �������.
         *
         * @instance
         * @public
         * @this TSS.UniverseLogic.Universe
         * @memberof TSS.UniverseLogic.Universe
         * @return  {void}
         */
        doUniverseTick: function () {
            var $t;

            if (this.isDisposed()) {
                return;
            }
            this.checkAllCells();
            this.handleAllCellsMoves();
            this.generateFood(this.getConstsUniverseProperty().special_FoodCountForTick);
            this.generatePoison(this.getConstsUniverseProperty().special_PoisonCountForTick);
            this.calcMostFitCell();
            if (this.ticksCount.mod(System.Int64(15)).equals(System.Int64(1))) {
                this.calcTotalUniverseEnergy();
            }
            this.ticksCount = this.ticksCount.inc();

            if (this.invokedActions.getCount() > 0) {
                $t = Bridge.getEnumerator(this.invokedActions.toArray());
                while ($t.moveNext()) {
                    var act = $t.getCurrent();
                    act();
                    this.invokedActions.remove(act);
                }
            }

        },
        /**
         * Every object in the universe has its own a descriptor. More about it in the comments to UniverseObject.
         This method allows you to find a descriptor of the object by coordinates on the field.
         <p />
         � ������� ������� �� ��������� ���� ���� ����������. ��������� � ��� � ������������ � UniverseObject.
         ���� ����� ��������� ������ ���������� ������� �� ����������� �� ����.
         *
         * @instance
         * @public
         * @this TSS.UniverseLogic.Universe
         * @memberof TSS.UniverseLogic.Universe
         * @param   {number}    x    
         * @param   {number}    y
         * @return  {number}
         */
        getObjectDescriptor: function (x, y) {
            if (this.validateCords(x, y) && this.getMatrixElement(x, y) != null) {
                return this.getMatrixElement(x, y).getDescriptor();
            }
            return 0;
        },
        /**
         * It returns an array of descriptors. In my project is used for rendering the game.
         <p />
         ���������� ������ ������������. � ���� ������� ������������ ��� ���������� ����.
         *
         * @instance
         * @public
         * @this TSS.UniverseLogic.Universe
         * @memberof TSS.UniverseLogic.Universe
         * @return  {Array.<number>}
         */
        getAllDescriptors: function () {
            var descriptors = System.Array.create(0, null, System.Int32, this.width, this.height);
            for (var i = 0; i < this.width; i = (i + 1) | 0) {
                for (var j = 0; j < this.height; j = (j + 1) | 0) {
                    descriptors.set([i, j], this.getObjectDescriptor(i, j));
                }
            }
            return descriptors;
        },
        getCellsCount: function () {
            return this.cellList.getCount();
        },
        getTicksCount: function () {
            return this.ticksCount;
        },
        getMostFitCell: function () {
            return this.mostFitGenome_OneCell;
        },
        getTotalUniverseEnergy: function () {
            return this.totalUniverseEnergy;
        },
        getMatrixElement: function (x, y) {
            return this.universeMatrix.get([x, y]);
        },
        /**
         * It uses the constructor to mark the place where the poison and food is generated. For the default food - all place.
         To poison - 1/50 of all cells, selected randomly.
         <p />
         ������������ � ������������ ���� �������� �����, ��� ������������ �� � ���. ��� ��� �� ��������� - ��� ������������. 
         ��� ��� - 1/50 ���� �����, ���������� ��������.
         *
         * @instance
         * @public
         * @this TSS.UniverseLogic.Universe
         * @memberof TSS.UniverseLogic.Universe
         * @return  {void}
         */
        setDefaultObjectsAccessiblePlace: function () {
            for (var i = 0; i < this.width; i = (i + 1) | 0) {
                for (var j = 0; j < this.height; j = (j + 1) | 0) {
                    this.setFoodCanPlaceAt(i, j, true);
                    this.setPoisonCanPlaceAt(i, j, TSS.Another.StableRandom.rd.next$2(0, 50) === 1);
                }
            }
        },
        setFoodCanPlaceAt: function (x, y, value) {
            if (this.validateCords(x, y)) {
                this.foodPlace.set([x, y], value);
            }
        },
        getFoodCanPlaceAt: function (x, y) {
            return this.foodPlace.get([x, y]);
        },
        setPoisonCanPlaceAt: function (x, y, value) {
            if (this.validateCords(x, y)) {
                this.poisonPlace.set([x, y], value);
            }
        },
        getPoisonCanPlaceAt: function (x, y) {
            return this.poisonPlace.get([x, y]);
        },
        /**
         * It marks the place where food can be generated using the input array. The same with poison.
         <p />
         �������� ����� ��� ����� �������������� ��� ��������� ������� ������. �� �� ����� � ����.
         *
         * @instance
         * @public
         * @this TSS.UniverseLogic.Universe
         * @memberof TSS.UniverseLogic.Universe
         * @param   {Array.<boolean>}    fieldDescription
         * @return  {void}
         */
        setAllPlaceOfFood: function (fieldDescription) {
            if (System.Array.getLength(fieldDescription, 0) !== this.width || System.Array.getLength(fieldDescription, 1) !== this.height) {
                throw new System.Exception("Field description size are not correct.");
            }
            this.foodPlace = Bridge.as(System.Array.clone(fieldDescription), System.Array.type(Boolean, 2));
        },
        getAllPlaceOfFood: function () {
            return Bridge.as(System.Array.clone(this.foodPlace), System.Array.type(Boolean, 2));
        },
        setAllPlaceOfPoison: function (fieldDescription) {
            if (System.Array.getLength(fieldDescription, 0) !== this.width || System.Array.getLength(fieldDescription, 1) !== this.height) {
                throw new System.Exception("Field description size are not correct.");
            }
            this.poisonPlace = Bridge.as(System.Array.clone(fieldDescription), System.Array.type(Boolean, 2));
        },
        getAllPlaceOfPoison: function () {
            return Bridge.as(System.Array.clone(this.poisonPlace), System.Array.type(Boolean, 2));
        },
        /**
         * Clears the field from all objects.
         Note: The method is executed asynchronously on the DoUniverseTick thread.
         <p />
         ������� ���� �� ���� ��������.
         ����������: ����� ���������� ���������� � ������ DoUniverseTick.
         *
         * @instance
         * @public
         * @this TSS.UniverseLogic.Universe
         * @memberof TSS.UniverseLogic.Universe
         * @param   {boolean}    isAsync
         * @return  {void}
         */
        clearField: function (isAsync) {
            if (isAsync === void 0) { isAsync = true; }
            var act = Bridge.fn.bind(this, $asm.$.TSS.UniverseLogic.Universe.f1);
            if (isAsync) {
                this.beginInvokeAction(act);
            } else {
                act();
            }
        },
        /**
         * Generates a predetermined number of cells. From the outside it is recommended to call it asynchronously, 
         then it will be executed in the flow DoUniverseTick. Asynchronous he was invoked before, to generate cells before the start of the game.
         <p />
         ���������� �������� ���������� ������. ����� ������������� �������� ��� ����������, ����� �� ���������� � ������ DoUniverseTick.
         ���������� �� ��������� ������, ���� ������������� ������ ����� ������� ����.
         *
         * @instance
         * @public
         * @this TSS.UniverseLogic.Universe
         * @memberof TSS.UniverseLogic.Universe
         * @param   {number}     count     
         * @param   {boolean}    isSync
         * @return  {void}
         */
        generateCells: function (count, isSync) {
            if (isSync === void 0) { isSync = true; }

            var act = Bridge.fn.bind(this, function () {
                //List<Cell> bufCellList = new List<Cell>(0);
                for (var i = 0; i < count; i = (i + 1) | 0) {

                    var x = TSS.Another.StableRandom.rd.next$1(this.width);
                    var y = TSS.Another.StableRandom.rd.next$1(this.height);
                    var cell = new TSS.UniverseLogic.Cell.ctor(this.getConstsUniverseProperty());
                    if (this.addUniverseObject(x, y, cell, true)) {
                        this.cellList.add(cell);
                        this.setTypesOfCellsCount((this.getTypesOfCellsCount() + 1) | 0);
                    }
                }
                //cellList.AddRange(bufCellList);
            });
            if (isSync) {
                this.beginInvokeAction(act);
            } else {
                act();
            }

        },
        /**
         * It fills the entire field of food.
         <p />
         ��������� ��� ���� ����.
         *
         * @instance
         * @public
         * @this TSS.UniverseLogic.Universe
         * @memberof TSS.UniverseLogic.Universe
         * @param   {boolean}    isAsync
         * @return  {void}
         */
        generateFoodOnAllField: function (isAsync) {
            if (isAsync === void 0) { isAsync = true; }
            this.clearField(isAsync);

            var act = Bridge.fn.bind(this, $asm.$.TSS.UniverseLogic.Universe.f2);
            if (isAsync) {
                this.beginInvokeAction(act);
            } else {
                act();
            }

        },
        /**
         * The method has will be performed during the next tick. This is done for the stable operation of the system.
         <p />
         ���������� ����� ����� �������� �� ����� ���������� ����. ��� �������� ��� ���������� ������ �������.
         *
         * @instance
         * @private
         * @this TSS.UniverseLogic.Universe
         * @memberof TSS.UniverseLogic.Universe
         * @param   {System.Action}    action
         * @return  {void}
         */
        beginInvokeAction: function (action) {
            this.invokedActions.add(action);
        },
        /**
         * Checks to x, y did not go out of bounds.
         <p />
         ��������� ���� x,y �� �������� �� ������� ����.
         *
         * @instance
         * @private
         * @this TSS.UniverseLogic.Universe
         * @memberof TSS.UniverseLogic.Universe
         * @param   {number}     x    
         * @param   {number}     y
         * @return  {boolean}
         */
        validateCords: function (x, y) {
            return (x >= 0 && y >= 0 && x < this.width && y < this.height);
        },
        /**
         * This method, moreover, which adds the object to the field monitors to the object so that the object got its current position in the matrix.
         It is necessary for Cell. When we calculate their direction of movement, we work through a list of cells,
         instead of through the elements matrix (field of this class). That has to be stored in the object coordinates and change them when moving.
         <p />
         ���� �����, ����� ����, ��� ��������� ������ �� ����, ������ ���� ������ ���� ������ ������� ���� ������� ���������� � �������.
         ��� ����� ��� Cell. ����� �� ����������� �� ����������� ��������, �� �������� ����� ������ ������,
         � �� ����� ������� ��������� (���� � ����� ������� ������). ��� � ���������� ������� ���������� � ����� ������� � ������ �� ��� �����������.
         *
         * @instance
         * @private
         * @this TSS.UniverseLogic.Universe
         * @memberof TSS.UniverseLogic.Universe
         * @param   {number}                              x                 
         * @param   {number}                              y                 
         * @param   {TSS.UniverseLogic.UniverseObject}    universeObject
         * @return  {void}
         */
        setMatrixElement: function (x, y, universeObject) {
            this.universeMatrix.set([x, y], universeObject);
            if (universeObject != null) {
                universeObject.setCords(x, y);
            }
        },
        /**
         * Extended version of SetMatrixElement. Among other things, monitoring the removal of the prev item.
         <p />
         ����������� ������ SetMatrixElement. ����� �������, ������ �� ��������� ������� ��������.
         *
         * @instance
         * @private
         * @this TSS.UniverseLogic.Universe
         * @memberof TSS.UniverseLogic.Universe
         * @param   {number}                              x                     
         * @param   {number}                              y                     
         * @param   {TSS.UniverseLogic.UniverseObject}    universeObject        
         * @param   {boolean}                             canReSetPrevObject
         * @return  {boolean}
         */
        addUniverseObject: function (x, y, universeObject, canReSetPrevObject) {
            if (this.getMatrixElement(x, y) == null) {
                this.setMatrixElement(x, y, universeObject);
                return true;
            } else if (canReSetPrevObject || this.getMatrixElement(x, y).isDisposed()) {
                this.getMatrixElement(x, y).dispose();
                this.setMatrixElement(x, y, universeObject);
                return true;
            }
            return false;
        },
        /**
         * It moves the object to a new location by removing the object which we are moving. At the site of the old object is formed empty space.
         <p />
         ���������� ������ �� ����� ����� ������ ��� ������, ���� �� ������������. �� ����� ������� ������� ���������� ������ ������������.
         *
         * @instance
         * @private
         * @this TSS.UniverseLogic.Universe
         * @memberof TSS.UniverseLogic.Universe
         * @param   {number}    x1    
         * @param   {number}    y1    
         * @param   {number}    x2    
         * @param   {number}    y2
         * @return  {void}
         */
        relocateUniverseObject: function (x1, y1, x2, y2) {
            this.setMatrixElement(x2, y2, this.getMatrixElement(x1, y1));
            this.setMatrixElement(x1, y1, null);
        },
        generateFood: function (count) {
            for (var i = 0; i < count; i = (i + 1) | 0) {
                var x = TSS.Another.StableRandom.rd.next$2(0, this.width);
                var y = TSS.Another.StableRandom.rd.next$2(0, this.height);
                if (this.getFoodCanPlaceAt(x, y)) {
                    if (this.getObjectDescriptor(x, y) > 100) {
                        try {
                            (Bridge.as(this.getMatrixElement(x, y), TSS.UniverseLogic.Cell)).addEnergy(this.getConstsUniverseProperty().energyLevel_DefFood);
                        }
                        catch ($e1) {
                            $e1 = System.Exception.create($e1);
                        }
                    } else {
                        this.addUniverseObject(x, y, new TSS.UniverseLogic.Food(this.getConstsUniverseProperty(), TSS.UniverseLogic.FoodType.defaultFood), true);
                    }
                }
            }
        },
        generatePoison: function (count) {
            for (var i = 0; i < count; i = (i + 1) | 0) {
                var x = TSS.Another.StableRandom.rd.next$2(0, this.width);
                var y = TSS.Another.StableRandom.rd.next$2(0, this.height);
                if (this.getPoisonCanPlaceAt(x, y)) {
                    if (this.getObjectDescriptor(x, y) > 100) {
                        try {
                            (Bridge.as(this.getMatrixElement(x, y), TSS.UniverseLogic.Cell)).addEnergy(this.getConstsUniverseProperty().energyLevel_PoisonedFood);
                        }
                        catch ($e1) {
                            $e1 = System.Exception.create($e1);
                        }
                    } else {
                        this.addUniverseObject(x, y, new TSS.UniverseLogic.Food(this.getConstsUniverseProperty(), TSS.UniverseLogic.FoodType.poison), true);
                    }
                }

            }
        },
        killCell: function (x, y) {
            this.getMatrixElement(x, y).dispose();
            this.addUniverseObject(x, y, new TSS.UniverseLogic.Food(this.getConstsUniverseProperty(), TSS.UniverseLogic.FoodType.deadCell), true);
        },
        /**
         * This method is called from DoUniverseTick for all cells. It is calculated for each cell the direction of its movement.
         And as soon as an event occurs: the cell takes damage, moves ...
         <p />        
         ���� ����� ���������� �� DoUniverseTick ��� ���� ������. � ��� ��� ������ ������ ������������� ����������� �� ��������.
         � ����� �� ���������� �������: ������ �������� ����, ������������...
         *
         * @instance
         * @private
         * @this TSS.UniverseLogic.Universe
         * @memberof TSS.UniverseLogic.Universe
         * @param   {TSS.UniverseLogic.Cell}    cell
         * @return  {void}
         */
        handleCellMove: function (cell) {
            if (cell.isDisposed()) {
                return;
            }
            var x1 = cell.getX(), y1 = cell.getY(), x2, y2;
            cell.calcMoveDirectionAspiration(this);
            var md = cell.getMoveDisperation();
            switch (md) {
                case TSS.UniverseLogic.MoveDirection.stand: 
                    return;
                case TSS.UniverseLogic.MoveDirection.up: 
                    x2 = x1;
                    y2 = (y1 - 1) | 0;
                    break;
                case TSS.UniverseLogic.MoveDirection.down: 
                    x2 = x1;
                    y2 = (y1 + 1) | 0;
                    break;
                case TSS.UniverseLogic.MoveDirection.left: 
                    x2 = (x1 - 1) | 0;
                    y2 = y1;
                    break;
                case TSS.UniverseLogic.MoveDirection.right: 
                    x2 = (x1 + 1) | 0;
                    y2 = y1;
                    break;
                default: 
                    return;
            }

            if (!this.validateCords(x2, y2)) {
                return;
            }

            var unObj = this.getMatrixElement(x2, y2);
            if (unObj == null || unObj.isDisposed()) {
                //���� ������ ������������.
                this.relocateUniverseObject(x1, y1, x2, y2);
            } else {
                var desc = unObj.getDescriptor();
                if (desc < 0) {
                    //���� ��� ��� ��.
                    cell.addEnergy((Bridge.as(unObj, TSS.UniverseLogic.Food)).getEnergyLevel());
                    this.relocateUniverseObject(x1, y1, x2, y2);
                } else if (cell.getDescriptor() === desc) {
                    //���� ������ - �����������
                    cell.addEnergy(this.getConstsUniverseProperty().energyLevel_MovesFriendly);
                    (Bridge.as(unObj, TSS.UniverseLogic.Cell)).addEnergy(this.getConstsUniverseProperty().energyLevel_MovesFriendly);
                } else {
                    var anotherCell = Bridge.as(unObj, TSS.UniverseLogic.Cell);
                    if ((this.getConstsUniverseProperty().mutation_AttackChildrenMutantsOfFirstGeneration || cell.getDescriptor() !== anotherCell.getParentDescriptor()) && (this.getConstsUniverseProperty().mutation_AttackParentIfCellIsYouMutant || cell.getParentDescriptor() !== anotherCell.getDescriptor())) {
                        /* ���� ��� ������ � ������ �������, ������� �������� �������� ��� ��������� ������ ������� ������, � ��� ���� �������� �����.
                         ��� �� ���� ������ ����� ������ ��������� �������������.*/
                        cell.addEnergy(this.getConstsUniverseProperty().energyLevel_MovesAggression * 0.8);
                        anotherCell.addEnergy(-this.getConstsUniverseProperty().energyLevel_MovesAggression);
                    }
                }
            }

        },
        handleAllCellsMoves: function () {
            var $t;
            $t = Bridge.getEnumerator(this.cellList);
            while ($t.moveNext()) {
                var cell = $t.getCurrent();
                this.handleCellMove(cell);
            }
        },
        /**
         * This method is called from DoUniverseTick. In this method, the main action - check whether the cells have died. Not checked whether they were
         deleted from the memory external method Dispose, checked their energy level, age.If all is well, it is calculated whether they can reproduce. 
         If it is ok creates another cell - child of it. So is calculated in this method, the total number of cells per field.
         Calculating the number of cell types, but the feature still does not work reliably.
         Sometimes the list of cells is mixed, so the calculation of their moves was more honest.
         <p />
         ���� ����� ���������� �� DoUniverseTick. � ���� ������ ������� �������� - �������� �� ������ �� ������. ����������� �� ���� �� ��� ������� �� ������
         ����� ������� Dispose, ����������� �� ������� �������, �������. ���� ��� ������, �� ������������� ����� �� ��� ������������.� ������ �����
         ����� ��������� ��� ���� ������. ���-�� � ���� ������ ������������� ����� ���������� ������ �� ����. ������������� ���������� ����� ������,
         �� ��� ������� �� ��� ��� �������� ���������. ������ ������ ������ ��������������, ���� ������ �� ����� ��� ����� �������.
         *
         * @instance
         * @private
         * @this TSS.UniverseLogic.Universe
         * @memberof TSS.UniverseLogic.Universe
         * @return  {void}
         */
        checkAllCells: function () {
            var cellCountWas = this.getCellsCount();
            var bufCellList = new (System.Collections.Generic.List$1(TSS.UniverseLogic.Cell))(0);

            for (var i = 0; i < this.cellList.getCount(); i = (i + 1) | 0) {
                if (this.cellList.getItem(i).isDisposed()) {
                    cellCountWas = (cellCountWas - 1) | 0;
                    continue;
                } else {
                    bufCellList.add(this.cellList.getItem(i));
                }

                if (this.cellList.getItem(i).incAge() || this.cellList.getItem(i).decEnergy()) {
                    cellCountWas = (cellCountWas - 1) | 0;
                    this.killCell(this.cellList.getItem(i).getX(), this.cellList.getItem(i).getY());
                    if (this.cellList.getItem(i).getCellsCountWithThisDescriptor() <= 0) {
                        this.setTypesOfCellsCount((this.getTypesOfCellsCount() - 1) | 0);
                    }
                    //if (cellList[i].GetCellsCountWithThisDescriptor() <= 0)
                    //    TypesOfCellsCount--;
                    continue;
                }

                var notUniverseOverflow = cellCountWas <= this.getConstsUniverseProperty().cellsCount_MaxAtField;
                if (notUniverseOverflow && this.cellList.getItem(i).canReproduct() && this.cellList.getItem(i).getCellsCountWithThisDescriptor() < this.getConstsUniverseProperty().cellsCount_MaxWithOneType) {
                    var md = new (System.Collections.Generic.List$1(TSS.UniverseLogic.MoveDirection))(0);
                    var x = this.cellList.getItem(i).getX();
                    var y = this.cellList.getItem(i).getY();
                    if (this.validateCords(x, ((y - 1) | 0)) && this.getObjectDescriptor(x, ((y - 1) | 0)) < 100) {
                        md.add(TSS.UniverseLogic.MoveDirection.up);
                    }
                    if (this.validateCords(x, ((y + 1) | 0)) && this.getObjectDescriptor(x, ((y + 1) | 0)) < 100) {
                        md.add(TSS.UniverseLogic.MoveDirection.down);
                    }
                    if (this.validateCords(((x - 1) | 0), y) && this.getObjectDescriptor(((x - 1) | 0), y) < 100) {
                        md.add(TSS.UniverseLogic.MoveDirection.left);
                    }
                    if (this.validateCords(((x + 1) | 0), y) && this.getObjectDescriptor(((x + 1) | 0), y) < 100) {
                        md.add(TSS.UniverseLogic.MoveDirection.right);
                    }

                    var choice = TSS.UniverseLogic.MoveDirection.stand;
                    if (md.getCount() > 0) {
                        choice = md.getItem(TSS.Another.StableRandom.rd.next$1(md.getCount()));
                    }

                    if (choice === TSS.UniverseLogic.MoveDirection.stand) {
                        continue;
                    }

                    var newCell = this.cellList.getItem(i).createChild(this.getTypesOfCellsCount() < this.getConstsUniverseProperty().maxCountOfCellTypes);

                    switch (choice) {
                        case TSS.UniverseLogic.MoveDirection.up: 
                            this.addUniverseObject(x, ((y - 1) | 0), newCell, true);
                            break;
                        case TSS.UniverseLogic.MoveDirection.down: 
                            this.addUniverseObject(x, ((y + 1) | 0), newCell, true);
                            break;
                        case TSS.UniverseLogic.MoveDirection.left: 
                            this.addUniverseObject(((x - 1) | 0), y, newCell, true);
                            break;
                        case TSS.UniverseLogic.MoveDirection.right: 
                            this.addUniverseObject(((x + 1) | 0), y, newCell, true);
                            break;
                    }
                    bufCellList.add(newCell);
                    if (newCell.getDescriptor() !== this.cellList.getItem(i).getDescriptor()) {
                        this.setTypesOfCellsCount((this.getTypesOfCellsCount() + 1) | 0);
                    }
                    cellCountWas = (cellCountWas + 1) | 0;
                }
            }

            var bufCellList2;
            if (this.ticksCount.mod(System.Int64(11)).equals(System.Int64(0))) {
                bufCellList2 = new (System.Collections.Generic.List$1(TSS.UniverseLogic.Cell))(0);
                while (bufCellList.getCount() > 0) {
                    var index = TSS.Another.StableRandom.rd.next$1(bufCellList.getCount());
                    bufCellList2.add(bufCellList.getItem(index));
                    bufCellList.removeAt(index);
                }
            } else {
                bufCellList2 = bufCellList;
            }

            this.cellList = bufCellList2;
        },
        /**
         * Find the most successful type of cell.
         <p />
         ������� ����� �������� ��� ������.
         *
         * @instance
         * @private
         * @this TSS.UniverseLogic.Universe
         * @memberof TSS.UniverseLogic.Universe
         * @return  {void}
         */
        calcMostFitCell: function () {
            var $t;
            var maxCount = 0;
            var cell = null;
            if (this.cellList.getCount() > 0) {
                cell = this.cellList.getItem(0);
            }
            $t = Bridge.getEnumerator(this.cellList);
            while ($t.moveNext()) {
                var item = $t.getCurrent();
                var count = item.getCellsCountWithThisDescriptor();
                if (count > maxCount) {
                    maxCount = count;
                    cell = item;
                }
            }
            this.mostFitGenome_OneCell = cell;
        },
        calcTotalUniverseEnergy: function () {
            var sum = System.Int64(0);
            for (var i = 0; i < this.width; i = (i + 1) | 0) {
                for (var j = 0; j < this.height; j = (j + 1) | 0) {
                    var uo = this.getMatrixElement(i, j);
                    if (uo != null && !uo.isDisposed() && Bridge.Reflection.isAssignableFrom(TSS.UniverseLogic.IHasEnergy, Bridge.getType(uo))) {
                        sum = sum.add(Bridge.Int.clip64((Bridge.as(uo, TSS.UniverseLogic.IHasEnergy)).TSS$UniverseLogic$IHasEnergy$getEnergyLevel()));
                    }

                }
            }
            this.totalUniverseEnergy = sum;
        }
    });

    Bridge.ns("TSS.UniverseLogic.Universe", $asm.$);

    Bridge.apply($asm.$.TSS.UniverseLogic.Universe, {
        f1: function () {
            this.cellList = new (System.Collections.Generic.List$1(TSS.UniverseLogic.Cell))();
            this.mostFitGenome_OneCell = null;
            this.universeMatrix = System.Array.create(null, null, TSS.UniverseLogic.UniverseObject, this.width, this.height);
            this.setTypesOfCellsCount(0);
        },
        f2: function () {
            for (var i = 0; i < this.width; i = (i + 1) | 0) {
                for (var j = 0; j < this.height; j = (j + 1) | 0) {
                    this.setMatrixElement(i, j, new TSS.UniverseLogic.Food(this.getConstsUniverseProperty(), TSS.UniverseLogic.FoodType.defaultFood));
                }
            }
        }
    });

    /**
     * Very important class. It is a alive organisms of our game.
     <p />
     ����� ������ �����. ������������ �� ���� ����� ��������� ����� ����.
     *
     * @class TSS.UniverseLogic.Cell
     * @augments TSS.UniverseLogic.UniverseObject
     * @implements  TSS.UniverseLogic.IHasEnergy
     */
    Bridge.define("TSS.UniverseLogic.Cell", {
        inherits: [TSS.UniverseLogic.UniverseObject,TSS.UniverseLogic.IHasEnergy],
        age: 0,
        energyLevel: 0,
        genome: null,
        moveDisperation: 0,
        parentDescriptor: 0,
        cellsWithThisDescriptorCount: null,
        config: {
            alias: [
            "getEnergyLevel", "TSS$UniverseLogic$IHasEnergy$getEnergyLevel",
            "dispose", "System$IDisposable$dispose"
            ],
            init: function () {
                this.cellsWithThisDescriptorCount = new TSS.UniverseLogic.Cell.LinkedInt();
            }
        },
        ctor: function (constsUniverse) {
            TSS.UniverseLogic.Cell.$ctor1.call(this, constsUniverse, new TSS.UniverseLogic.Genome.$ctor1(constsUniverse), constsUniverse.energyLevel_CreatingCell, 1);

        },
        $ctor1: function (constsUniverse, genome, energyLevel, descriptor) {
            this.$initialize();
            TSS.UniverseLogic.UniverseObject.ctor.call(this, constsUniverse);
            this.genome = genome;
            this.age = 0;
            this.energyLevel = energyLevel;
            if (descriptor < 100) {
                var desc = TSS.Another.StableRandom.rd.next$2(100, 2147483647);
                this.descriptor = desc;
            } else {
                this.descriptor = descriptor;
            }
            this.parentDescriptor = TSS.Another.StableRandom.rd.next$2(100, 2147483647);
        },
        /**
         * An important part of the system. Genome - a cell data storage (its behavioral factors). Cells with identical genomes have identical descriptors.
         <p />
         ������ ����� �������. ����� - ��������� ������ � ������(�� ������������� �������). � ������ � ���������� ������� ���������� �����������.
         *
         * @instance
         * @public
         * @this TSS.UniverseLogic.Cell
         * @memberof TSS.UniverseLogic.Cell
         * @return  {TSS.UniverseLogic.Genome}
         */
        getGenome: function () {
            return this.genome;
        },
        getMoveDisperation: function () {
            return this.moveDisperation;
        },
        getEnergyLevel: function () {
            return this.energyLevel;
        },
        addEnergy: function (value) {
            this.energyLevel += value;
            if (this.energyLevel > this.getConstsUniverseProperty().energyLevel_MaxForCell) {
                this.energyLevel = this.getConstsUniverseProperty().energyLevel_MaxForCell;
            }

        },
        incAge: function () {
            return Bridge.identity(this.age, (this.age = (this.age + 1) | 0)) > this.getConstsUniverseProperty().cellAge_Max;
        },
        decEnergy: function () {
            this.energyLevel -= this.getConstsUniverseProperty().energyEntropyPerSecond;
            return this.energyLevel < 0;
        },
        getAge: function () {
            return this.age;
        },
        /**
         * This method is used by universe to create a cells descendants.
         If you want to count the number of cells with a particular gene, and always know descriptor of cells parent, then use this method.
         <p />
         ����� ������������ ��������� ��� �������� �������� ������.
         ���� �� ������ ������������ ���������� ������ � ���������� �������, � ����� ������ �������� ���������� ����������� ������, �� ����������� ���� �����.
         *
         * @instance
         * @public
         * @this TSS.UniverseLogic.Cell
         * @memberof TSS.UniverseLogic.Cell
         * @param   {boolean}                   haveMutationChance
         * @return  {TSS.UniverseLogic.Cell}
         */
        createChild: function (haveMutationChance) {
            this.age = 0;
            this.energyLevel = Bridge.Int.clip32(this.energyLevel / 2);
            var res;
            if (haveMutationChance && TSS.Another.StableRandom.rd.next$1(100) < this.getConstsUniverseProperty().mutation_ChancePercent && this.getConstsUniverseProperty().mutation_Enable) {
                res = new TSS.UniverseLogic.Cell.$ctor1(this.getConstsUniverseProperty(), this.genome.cloneAndMutate(this.getConstsUniverseProperty().mutation_ChangedValuesAtOne), this.getEnergyLevel(), 1);
                res.parentDescriptor = this.descriptor;
            } else {
                res = new TSS.UniverseLogic.Cell.$ctor1(this.getConstsUniverseProperty(), this.genome.clone(), this.getEnergyLevel(), this.descriptor);
                res.cellsWithThisDescriptorCount = this.cellsWithThisDescriptorCount;
                this.cellsWithThisDescriptorCount.value = (this.cellsWithThisDescriptorCount.value + 1) | 0;
                res.parentDescriptor = this.parentDescriptor;
            }

            return res;

        },
        /**
         * The method calculates the direction of cell movement only. Moving makes the universe itself.
         <p />
         ����� ������������ ����������� �������� ������ � ������. ����������� ���������� ���� ���������.
         *
         * @instance
         * @public
         * @this TSS.UniverseLogic.Cell
         * @memberof TSS.UniverseLogic.Cell
         * @param   {TSS.UniverseLogic.Universe}    universe
         * @return  {void}
         */
        calcMoveDirectionAspiration: function (universe) {
            //map for navigation
            //     q2   b3  q4
            //
            //q0   b1   a1  b5   q6
            //
            //b0   a0   c   a3   b7
            //
            //q1   b2   a2  b6   q7
            //
            //     q3   b4  q5

            //it looks terribly, but it`s optimaized
            var a0 = universe.getObjectDescriptor(((this.x - 1) | 0), this.y), a1 = universe.getObjectDescriptor(this.x, ((this.y - 1) | 0)), a2 = universe.getObjectDescriptor(this.x, ((this.y + 1) | 0)), a3 = universe.getObjectDescriptor(((this.x + 1) | 0), this.y);
            //if(a0>100 && a1 > 100 && a2 > 100 && a3 > 100)
            //{
            //    moveDisperation = MoveDirection.stand;
            //    return;
            //}

            var b0 = universe.getObjectDescriptor(((this.x - 2) | 0), this.y), b1 = universe.getObjectDescriptor(((this.x - 1) | 0), ((this.y - 1) | 0)), b2 = universe.getObjectDescriptor(((this.x - 1) | 0), ((this.y + 1) | 0)), b3 = universe.getObjectDescriptor(this.x, ((this.y - 2) | 0)), b4 = universe.getObjectDescriptor(this.x, ((this.y + 2) | 0)), b5 = universe.getObjectDescriptor(((this.x + 1) | 0), ((this.y - 1) | 0)), b6 = universe.getObjectDescriptor(((this.x + 1) | 0), ((this.y + 1) | 0)), b7 = universe.getObjectDescriptor(((this.x + 2) | 0), this.y), q0 = universe.getObjectDescriptor(((this.x - 2) | 0), ((this.y - 1) | 0)), q1 = universe.getObjectDescriptor(((this.x - 2) | 0), ((this.y + 1) | 0)), q2 = universe.getObjectDescriptor(((this.x - 1) | 0), ((this.y - 2) | 0)), q3 = universe.getObjectDescriptor(((this.x - 1) | 0), ((this.y + 2) | 0)), q4 = universe.getObjectDescriptor(((this.x + 1) | 0), ((this.y - 2) | 0)), q5 = universe.getObjectDescriptor(((this.x + 1) | 0), ((this.y + 2) | 0)), q6 = universe.getObjectDescriptor(((this.x + 2) | 0), ((this.y - 1) | 0)), q7 = universe.getObjectDescriptor(((this.x + 2) | 0), ((this.y + 1) | 0));

            var ad_a0 = this.analizeDescriptor(a0), ad_a1 = this.analizeDescriptor(a1), ad_a2 = this.analizeDescriptor(a2), ad_a3 = this.analizeDescriptor(a3), ad_b0 = this.analizeDescriptor(b1), ad_b1 = this.analizeDescriptor(b1), ad_b2 = this.analizeDescriptor(b2), ad_b3 = this.analizeDescriptor(b3), ad_b4 = this.analizeDescriptor(b4), ad_b5 = this.analizeDescriptor(b5), ad_b6 = this.analizeDescriptor(b6), ad_b7 = this.analizeDescriptor(b7), ad_q0 = this.analizeDescriptor(q0), ad_q1 = this.analizeDescriptor(q1), ad_q2 = this.analizeDescriptor(q2), ad_q3 = this.analizeDescriptor(q3), ad_q4 = this.analizeDescriptor(q4), ad_q5 = this.analizeDescriptor(q5), ad_q6 = this.analizeDescriptor(q6), ad_q7 = this.analizeDescriptor(q7);

            var up, down, left, right;
            up = ad_q2 + ad_q4 + 2 * (ad_b1 + ad_b3 + ad_b5) + 3 * ad_a1;
            down = ad_q3 + ad_q5 + 2 * (ad_b2 + ad_b4 + ad_b6) + 3 * ad_a2;
            left = ad_q0 + ad_q1 + 2 * (ad_b0 + ad_b1 + ad_b2) + 3 * ad_a0;
            right = ad_q6 + ad_q7 + 2 * (ad_b5 + ad_b6 + ad_b7) + 3 * ad_a3;


            var biggest = up;
            if (down > biggest) {
                biggest = down;
            }
            if (left > biggest) {
                biggest = left;
            }
            if (right > biggest) {
                biggest = right;
            }

            var res = TSS.UniverseLogic.MoveDirection.stand;
            if (biggest >= 0) {
                var md = new (System.Collections.Generic.List$1(TSS.UniverseLogic.MoveDirection))(0);
                if (biggest === up) {
                    md.add(TSS.UniverseLogic.MoveDirection.up);
                }
                if (biggest === down) {
                    md.add(TSS.UniverseLogic.MoveDirection.down);
                }
                if (biggest === left) {
                    md.add(TSS.UniverseLogic.MoveDirection.left);
                }
                if (biggest === right) {
                    md.add(TSS.UniverseLogic.MoveDirection.right);
                }

                res = md.getItem(TSS.Another.StableRandom.rd.next$1(md.getCount()));
            }
            this.moveDisperation = res;
        },
        canReproduct: function () {
            return ((this.getEnergyLevel() >= (this.getConstsUniverseProperty().energyLevel_NeededForReproduction - (this.genome.getReproduction() * this.getConstsUniverseProperty().energyLevel_NeededForReproduction / 200))) && this.isAdult());
        },
        /**
         * Among other things, the method reduces 1 from the number of cells with that type.
         <p />
         ����� �������, ����� ��������� ���������� ������ � ���� ����� �� 1.
         *
         * @instance
         * @public
         * @override
         * @this TSS.UniverseLogic.Cell
         * @memberof TSS.UniverseLogic.Cell
         * @return  {void}
         */
        dispose: function () {
            if (!this.isDisposed()) {
                this.cellsWithThisDescriptorCount.value = (this.cellsWithThisDescriptorCount.value - 1) | 0;
                //cellsWithThisDescriptorCount = null;
            }
            TSS.UniverseLogic.UniverseObject.prototype.dispose.call(this);
            this.genome = null;
        },
        getCellsCountWithThisDescriptor: function () {
            return this.cellsWithThisDescriptorCount.value;
        },
        getParentDescriptor: function () {
            return this.parentDescriptor;
        },
        isAdult: function () {
            return this.getAge() >= this.getConstsUniverseProperty().cellAge_AdultCell;
        },
        /**
         * Returns commitment of cell to move to an object with a handle.
         <p />
         ���������� ���������� ������ �������� � ������� � ����� ������������.
         *
         * @instance
         * @private
         * @this TSS.UniverseLogic.Cell
         * @memberof TSS.UniverseLogic.Cell
         * @param   {number}    desc
         * @return  {number}
         */
        analizeDescriptor: function (desc) {
            if (desc === 0) {
                return 0;
            } else if (desc === this.descriptor) {
                return this.genome.getFriendly();
            } else if (desc < 0) {
                if (desc === -3) {
                    return this.genome.getPoisonAddiction();
                }
                if (desc === -2) {
                    return this.genome.getCorpseAddiction();
                }
                return this.genome.getHunger();
            } else {
                if (this.isAdult()) {
                    return this.genome.getAggression();
                } else {
                    return this.getConstsUniverseProperty().cellGenome_Child_Aggression;
                }
            }



        }
    });

    Bridge.define("TSS.UniverseLogic.Food", {
        inherits: [TSS.UniverseLogic.UniverseObject,TSS.UniverseLogic.IHasEnergy],
        getEnergyLevelDelegate: null,
        config: {
            alias: [
            "getEnergyLevel", "TSS$UniverseLogic$IHasEnergy$getEnergyLevel"
            ]
        },
        ctor: function (constsUniverse, foodType) {
            this.$initialize();
            TSS.UniverseLogic.UniverseObject.ctor.call(this, constsUniverse);
            //I use delegate to always return value from ConstsUniverse, if it updated.
            if (foodType === TSS.UniverseLogic.FoodType.defaultFood) {
                this.descriptor = -1;
                this.getEnergyLevelDelegate = Bridge.fn.bind(this, $asm.$.TSS.UniverseLogic.Food.f1);
            } else if (foodType === TSS.UniverseLogic.FoodType.deadCell) {
                this.descriptor = -2;
                this.getEnergyLevelDelegate = Bridge.fn.bind(this, $asm.$.TSS.UniverseLogic.Food.f2);
            } else if (foodType === TSS.UniverseLogic.FoodType.poison) {
                this.descriptor = -3;
                this.getEnergyLevelDelegate = Bridge.fn.bind(this, $asm.$.TSS.UniverseLogic.Food.f3);
            }
        },
        getEnergyLevel: function () {
            return this.getEnergyLevelDelegate();
        }
    });

    Bridge.ns("TSS.UniverseLogic.Food", $asm.$);

    Bridge.apply($asm.$.TSS.UniverseLogic.Food, {
        f1: function () {
            return this.getConstsUniverseProperty().energyLevel_DefFood;
        },
        f2: function () {
            return this.getConstsUniverseProperty().energyLevel_DeadCell;
        },
        f3: function () {
            return this.getConstsUniverseProperty().energyLevel_PoisonedFood;
        }
    });

    var $m = Bridge.setMetadata,
        $n = [System,TSS.Helpers,TSS.UniverseLogic];
    $m($n[1].MinMaxInt, function () { return {"at":[new TSS.Helpers.ParsebleAttribute()]}; });
    $m($n[2].ConstsUniverse, function () { return {"m":[{"at":[new TSS.Helpers.NumericValuesAttribute.ctor(-2147483648.0, 2147483647.0)],"a":2,"n":"CellAge_AdultCell","t":4,"rt":$n[0].Int32,"sn":"cellAge_AdultCell"},{"at":[new TSS.Helpers.NumericValuesAttribute.ctor(-2147483648.0, 2147483647.0)],"a":2,"n":"CellAge_Max","t":4,"rt":$n[0].Int32,"sn":"cellAge_Max"},{"at":[new TSS.Helpers.NumericValuesAttribute.ctor(-2147483648.0, 2147483647.0)],"a":2,"n":"CellGenome_Child_Aggression","t":4,"rt":$n[0].Int32,"sn":"cellGenome_Child_Aggression"},{"at":[new TSS.Helpers.NumericValuesAttribute.ctor(-2147483648.0, 2147483647.0)],"a":2,"n":"CellsCount_MaxAtField","t":4,"rt":$n[0].Int32,"sn":"cellsCount_MaxAtField"},{"at":[new TSS.Helpers.NumericValuesAttribute.ctor(-2147483648.0, 2147483647.0)],"a":2,"n":"CellsCount_MaxWithOneType","t":4,"rt":$n[0].Int32,"sn":"cellsCount_MaxWithOneType"},{"at":[new TSS.Helpers.NumericValuesAttribute.ctor(-99999.0, 99999.0)],"a":2,"n":"EnergyEntropyPerSecond","t":4,"rt":$n[0].Single,"sn":"energyEntropyPerSecond"},{"at":[new TSS.Helpers.NumericValuesAttribute.ctor(-3.4028234663852886E+38, 3.4028234663852886E+38)],"a":2,"n":"EnergyLevel_CreatingCell","t":4,"rt":$n[0].Single,"sn":"energyLevel_CreatingCell"},{"at":[new TSS.Helpers.NumericValuesAttribute.ctor(-3.4028234663852886E+38, 3.4028234663852886E+38)],"a":2,"n":"EnergyLevel_DeadCell","t":4,"rt":$n[0].Single,"sn":"energyLevel_DeadCell"},{"at":[new TSS.Helpers.NumericValuesAttribute.ctor(-3.4028234663852886E+38, 3.4028234663852886E+38)],"a":2,"n":"EnergyLevel_DefFood","t":4,"rt":$n[0].Single,"sn":"energyLevel_DefFood"},{"at":[new TSS.Helpers.NumericValuesAttribute.ctor(-3.4028234663852886E+38, 3.4028234663852886E+38)],"a":2,"n":"EnergyLevel_MaxForCell","t":4,"rt":$n[0].Single,"sn":"energyLevel_MaxForCell"},{"at":[new TSS.Helpers.NumericValuesAttribute.ctor(-3.4028234663852886E+38, 3.4028234663852886E+38)],"a":2,"n":"EnergyLevel_MovesAggression","t":4,"rt":$n[0].Single,"sn":"energyLevel_MovesAggression"},{"at":[new TSS.Helpers.NumericValuesAttribute.ctor(-3.4028234663852886E+38, 3.4028234663852886E+38)],"a":2,"n":"EnergyLevel_MovesFriendly","t":4,"rt":$n[0].Single,"sn":"energyLevel_MovesFriendly"},{"at":[new TSS.Helpers.NumericValuesAttribute.ctor(-3.4028234663852886E+38, 3.4028234663852886E+38)],"a":2,"n":"EnergyLevel_NeededForReproduction","t":4,"rt":$n[0].Single,"sn":"energyLevel_NeededForReproduction"},{"at":[new TSS.Helpers.NumericValuesAttribute.ctor(-3.4028234663852886E+38, 3.4028234663852886E+38)],"a":2,"n":"EnergyLevel_PoisonedFood","t":4,"rt":$n[0].Single,"sn":"energyLevel_PoisonedFood"},{"at":[new TSS.Helpers.NumericValuesAttribute.$ctor1(0.0, 100.0, 1)],"a":2,"n":"Mutation_ChancePercent","t":4,"rt":$n[0].Int32,"sn":"mutation_ChancePercent"},{"at":[new TSS.Helpers.NumericValuesAttribute.ctor(1.0, 200.0)],"a":2,"n":"Mutation_ChangedValuesAtOne","t":4,"rt":$n[0].Int32,"sn":"mutation_ChangedValuesAtOne"},{"at":[new TSS.Helpers.NumericValuesAttribute.ctor(0.0, 30000.0)],"a":2,"n":"Special_FoodCountForTick","t":4,"rt":$n[0].Int32,"sn":"special_FoodCountForTick"},{"at":[new TSS.Helpers.NumericValuesAttribute.ctor(0.0, 30000.0)],"a":2,"n":"Special_PoisonCountForTick","t":4,"rt":$n[0].Int32,"sn":"special_PoisonCountForTick"}]}; });
});
