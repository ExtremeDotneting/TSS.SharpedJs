/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 15.7.0
 */
Bridge.assembly("TSS.SharpedJs", function ($asm, globals) {
    "use strict";

    Bridge.define("TSS.SharpedJs.App", {
        $main: function () {

            var game = new TSS.SharpedJs.GameMainDispatcher();
            game.runGame();
        }
    });

    /** @namespace TSS.SharpedJs */

    /**
     * Universe class use it.
     <p />
     Интерфейс используется Universe.
     *
     * @abstract
     * @class TSS.SharpedJs.IHasEnergy
     */
    Bridge.define("TSS.SharpedJs.IHasEnergy", {
        $kind: "interface"
    });

    /**
     * An important part of the gaming universe.
     <p />
     ��������� ����� ������� ���������.
     *
     * @abstract
     * @class TSS.SharpedJs.UniverseObject
     * @implements  System.IDisposable
     */
    Bridge.define("TSS.SharpedJs.UniverseObject", {
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
         * @this TSS.SharpedJs.UniverseObject
         * @memberof TSS.SharpedJs.UniverseObject
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
     * @class TSS.SharpedJs.Cell.LinkedInt
     */
    Bridge.define("TSS.SharpedJs.Cell.LinkedInt", {
        value: 1
    });

    /**
     * The values used to calculate the processes in the universe (game). Their change - the basic essence of the gameplay.
     Attributes such as [NumericValues(1, 200)] used in ValuesRedactor giving him an idea of how you can edit this field.
     <p />
     Значения, используемые для расчета процессов во вселенной (игры). Их изменение - основная суть геймплея.
     Атрибуты типа[NumericValues(1, 200)] используются в ValuesRedactor давая ему представление о том как можно редактировать данное поле.
     *
     * @class TSS.SharpedJs.ConstsUniverse
     */
    Bridge.define("TSS.SharpedJs.ConstsUniverse", {
        statics: {
            create: function () {
                if (TSS.SharpedJs.CookieManager.getInstance().containsCookie("universe_consts_saved")) {
                    return Bridge.merge(Bridge.createInstance(TSS.SharpedJs.ConstsUniverse), JSON.parse(System.Convert.toString(TSS.SharpedJs.CookieManager.getInstance().getValue("universe_consts_saved"))));
                } else {
                    return new TSS.SharpedJs.ConstsUniverse();
                }
            }
        },
        maxCountOfCellTypes: 10000,
        mutation_Enable: true,
        mutation_AttackChildrenMutantsOfFirstGeneration: false,
        mutation_AttackParentIfCellIsYouMutant: true,
        mutation_ChangedValuesAtOne: 40,
        mutation_ChancePercent: 5,
        cellAge_Max: 100,
        cellAge_AdultCell: 20,
        energyLevel_CreatingCell: 225,
        energyLevel_NeededForReproduction: 200,
        energyLevel_MaxForCell: 500,
        energyLevel_DeadCell: 10,
        energyLevel_DefFood: 20,
        energyLevel_PoisonedFood: -100,
        energyLevel_MovesFriendly: 1,
        energyLevel_MovesAggression: 50,
        cellsCount_MaxWithOneType: 900000,
        cellGenome_Child_Aggression: -2,
        cellsCount_MaxAtField: 2500000,
        energyEntropyPerSecond: 1,
        special_FoodCountForTick: 2,
        special_PoisonCountForTick: 20,
        cellGenome_HungerRange: null,
        cellGenome_AggressionRange: null,
        cellGenome_ReproductionRange: null,
        cellGenome_FriendlyRange: null,
        cellGenome_PoisonRange: null,
        cellGenome_CorpseRange: null,
        config: {
            init: function () {
                this.cellGenome_HungerRange = new TSS.SharpedJs.MinMaxInt.$ctor1(-10, 10);
                this.cellGenome_AggressionRange = new TSS.SharpedJs.MinMaxInt.$ctor1(-10, 10);
                this.cellGenome_ReproductionRange = new TSS.SharpedJs.MinMaxInt.$ctor1(-10, 10);
                this.cellGenome_FriendlyRange = new TSS.SharpedJs.MinMaxInt.$ctor1(-10, 10);
                this.cellGenome_PoisonRange = new TSS.SharpedJs.MinMaxInt.$ctor1(-10, 10);
                this.cellGenome_CorpseRange = new TSS.SharpedJs.MinMaxInt.$ctor1(-10, 10);
            }
        },
        ctor: function () {
            this.$initialize();
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
        saveToCookies: function () {
            TSS.SharpedJs.CookieManager.getInstance().setValue("universe_consts_saved", JSON.stringify(this));
        },
        randomFromRange: function (minValue, maxValue) {
            if (minValue >= maxValue) {
                return minValue;
            } else {
                return TSS.SharpedJs.StableRandom.rd.next$2(minValue, maxValue);
            }
        }
    });

    Bridge.define("TSS.SharpedJs.ConstsUniversePresenter", {
        inherits: [System.IDisposable],
        isOpened: false,
        redactorTable: null,
        config: {
            properties: {
                ConstsUniverse: null,
                CallbackAfterSubmit: null,
                DetailsElement: null
            },
            alias: [
            "dispose", "System$IDisposable$dispose"
            ]
        },
        ctor: function (detailsElement, constsUniverse) {
            this.$initialize();
            this.setConstsUniverse(constsUniverse);
            this.setDetailsElement(detailsElement);
            //DetailsElement.GetElementsByClassName("consts-redactor-label")[0].InnerHTML = LanguageHandler.Instance.TitleOfUniverseConstsRedactor;
            this.redactorTable = Bridge.as(this.getDetailsElement().getElementsByClassName("consts-redactor-table")[0], HTMLTableElement);
            this.getDetailsElement().onclick = Bridge.fn.bind(this, $asm.$.TSS.SharpedJs.ConstsUniversePresenter.f1);
            var acceptButton = document.createElement('button');
            acceptButton.textContent = TSS.SharpedJs.LanguageHandler.getInstance().applyButtonText;
            acceptButton.setAttribute("align", "left");

            acceptButton.onclick = Bridge.fn.bind(this, $asm.$.TSS.SharpedJs.ConstsUniversePresenter.f2);
            this.getDetailsElement().appendChild(acceptButton);
            this.getDetailsElement().setAttribute("align", "left");
            this.initRedactorTable(constsUniverse, this.redactorTable);
            this.redactorTable.onkeydown = Bridge.fn.combine(this.redactorTable.onkeydown, Bridge.fn.bind(this, $asm.$.TSS.SharpedJs.ConstsUniversePresenter.f3));
        },
        submit: function () {
            var $t;
            this.readValuesToObject(this.getConstsUniverse(), this.redactorTable);
            this.getConstsUniverse().saveToCookies();
            !Bridge.staticEquals(($t = this.getCallbackAfterSubmit()), null) ? $t() : null;
            //DetailsElement.RemoveAttribute("open");
        },
        initRedactorTable: function (objectWithFields, table) {
            var $t;
            var tableHtml = "";
            var objType = Bridge.getType(objectWithFields);
            $t = Bridge.getEnumerator(Bridge.Reflection.getMembers(objType, 4, 94));
            while ($t.moveNext()) {
                var fieldInfo = $t.getCurrent();

                //tableHtml += CreateRow(objectWithFields, objType.GetField("CellGenome_HungerRange"));
                tableHtml = System.String.concat(tableHtml, (this.createRow(objectWithFields, fieldInfo)));
            }
            table.innerHTML = tableHtml;
        },
        createRow: function (objectWithFields, fieldInfo) {
            var htmlRes = "";
            if (Bridge.Reflection.isAssignableFrom(System.IFormattable, fieldInfo.rt) || Bridge.Reflection.isAssignableFrom(Boolean, fieldInfo.rt)) {
                var fieldType = fieldInfo.rt;
                var fieldValue = Bridge.Reflection.fieldAccess(fieldInfo, objectWithFields);

                var atr = null;
                try {
                    atr = Bridge.as(System.Attribute.getCustomAttributes(fieldInfo, TSS.SharpedJs.NumericValuesAttribute)[0], TSS.SharpedJs.NumericValuesAttribute);
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                }
                var htmlToPresentField = "error";

                if (Bridge.Reflection.isAssignableFrom(Boolean, fieldInfo.rt)) {
                    var checkBoxState = System.Convert.toBoolean(fieldValue) ? "checked" : "";
                    htmlToPresentField = System.String.format("<input type='checkbox' class='{0}' {1}>", fieldInfo.n, checkBoxState);
                    //bool
                } else if (atr == null) {
                    htmlToPresentField = System.String.format("<input type='text'  class='{0}' value='{1}'>", fieldInfo.n, System.Convert.toString(fieldValue));
                    //use textBox
                } else if (atr.wayToShow === TSS.SharpedJs.NumericValuesWayToShow.Default) {
                    htmlToPresentField = System.String.format("<input type='text' class='{0}' value='{1}' custom_min='{2}' custom_max='{3}' is_num>", fieldInfo.n, System.Convert.toString(fieldValue), atr.min, atr.max);
                    //use textBox and max min
                } else if (atr.wayToShow === TSS.SharpedJs.NumericValuesWayToShow.Slider) {
                    var format = "<input type='range' class='{0}' value='{1}' min='{2}' max='{3}' custom_min='{2}' custom_max='{3}' onchange='document.getElementById(\"{4}\").innerHTML=this.value;'><span id={4}>{1}</span>";
                    var spanId = System.String.concat("spanId", TSS.SharpedJs.StableRandom.rd.next$2(1000000, 9999999).toString());
                    htmlToPresentField = System.String.format(format, fieldInfo.n, System.Convert.toString(fieldValue), atr.min, atr.max, spanId);
                    //use textBox and max min
                } else {
                    throw new System.Exception(System.String.concat("Don`t know how to show field ", fieldInfo.n, "."));
                }

                htmlRes = System.String.format("<tr><td>{0}</td><td>{1}</td></tr>", fieldInfo.n, htmlToPresentField);
            }
            return htmlRes;
        },
        readValuesToObject: function (objectWithFields, table) {
            var $t, $t1;
            var bufForValues = new (System.Collections.Generic.Dictionary$2(String,Object))();
            var objType = Bridge.getType(objectWithFields);
            $t = Bridge.getEnumerator(Bridge.Reflection.getMembers(objType, 4, 94));
            while ($t.moveNext()) {
                var fieldInfo = $t.getCurrent();
                var inputElement = Bridge.as(this.redactorTable.getElementsByClassName(fieldInfo.n)[0], HTMLInputElement);
                var fieldValue = null;
                try {
                    fieldValue = this.tryGetValue(inputElement, fieldInfo);
                }
                catch (ex) {
                    ex = System.Exception.create(ex);
                    if (Bridge.Reflection.isAssignableFrom(TSS.SharpedJs.ParsebleException, Bridge.getType(ex)) && (Bridge.as(ex, TSS.SharpedJs.ParsebleException)).getMessageForUser() != null) {
                        window.alert((Bridge.as(ex, TSS.SharpedJs.ParsebleException)).getMessageForUser());
                    } else {
                        window.alert(System.String.format(TSS.SharpedJs.LanguageHandler.getInstance().incorrectValueMsg, fieldInfo.n));
                    }
                    inputElement.focus();

                    throw ex;
                }
                bufForValues.add(fieldInfo.n, fieldValue);
            }
            $t1 = Bridge.getEnumerator(Bridge.Reflection.getMembers(objType, 4, 94));
            while ($t1.moveNext()) {
                var fieldInfo1 = $t1.getCurrent();
                var fieldValue1 = bufForValues.get(fieldInfo1.n);
                Bridge.Reflection.fieldAccess(fieldInfo1, objectWithFields, fieldValue1);
            }
            this.initRedactorTable(objectWithFields, table);
        },
        tryGetValue: function (inputElement, fieldInfo) {
            var res = null;
            if (inputElement.type === "checkbox") {
                res = inputElement.checked;
            } else if (inputElement.type === "range") {
                res = System.Convert.toDouble(inputElement.value);
            } else if (Bridge.Reflection.getAttributes(fieldInfo.rt, TSS.SharpedJs.ParsebleAttribute, true).length > 0) {
                res = TSS.SharpedJs.ParsebleAttribute.parse(inputElement.value, fieldInfo.rt);
            } else if (inputElement.hasAttribute("is_num")) {
                var resMaybe = System.Convert.toDouble(inputElement.value);
                if (inputElement.hasAttribute("custom_min")) {
                    var min = System.Convert.toDouble(inputElement.getAttribute("custom_min"));
                    var max = System.Convert.toDouble(inputElement.getAttribute("custom_max"));
                    if (max > min && (resMaybe < min || resMaybe > max)) {
                        throw new TSS.SharpedJs.ParsebleException.$ctor2("Value not in range!", System.String.format(TSS.SharpedJs.LanguageHandler.getInstance().incorrectRangeMsg, fieldInfo.n, min, max));
                    }
                }
                res = resMaybe;
            } else {
                res = inputElement.value;
            }
            return res;
        },
        dispose: function () {
            this.setConstsUniverse(null);
            this.redactorTable = null;
            this.setDetailsElement(null);
        }
    });

    Bridge.ns("TSS.SharpedJs.ConstsUniversePresenter", $asm.$);

    Bridge.apply($asm.$.TSS.SharpedJs.ConstsUniversePresenter, {
        f1: function (me) {
            this.isOpened = !this.getDetailsElement().hasAttribute("open");
        },
        f2: function (me) {
            this.submit();
        },
        f3: function (sender) {
            if (sender.keyCode === 13) {
                this.submit();
            }
        }
    });

    Bridge.define("TSS.SharpedJs.CookieManager", {
        statics: {
            cookieBuf: null,
            instance: null,
            getInstance: function () {
                if (TSS.SharpedJs.CookieManager.instance == null) {
                    TSS.SharpedJs.CookieManager.instance = new TSS.SharpedJs.CookieManager();
                }
                return TSS.SharpedJs.CookieManager.instance;
            }
        },
        config: {
            properties: {
                IsCookiesEnabled: false
            }
        },
        ctor: function () {
            this.$initialize();
            this.setIsCookiesEnabled(navigator.cookieEnabled && !Bridge.referenceEquals(window.location.protocol, "file:"));
            if (!this.getIsCookiesEnabled()) {
                TSS.SharpedJs.CookieManager.cookieBuf = new (System.Collections.Generic.Dictionary$2(String,Object))();
            }

        },
        getValue: function (cookieName) {
            if (this.getIsCookiesEnabled()) {
                return HelperForGetCookie(cookieName);
            } else {
                return TSS.SharpedJs.CookieManager.cookieBuf.get(cookieName);
            }
        },
        setValue: function (cookieName, value) {
            if (this.getIsCookiesEnabled()) {
                HelperForSetCookie(cookieName, value, "");
            } else {
                if (this.containsCookie(cookieName)) {
                    TSS.SharpedJs.CookieManager.cookieBuf.set(cookieName, value);
                } else {
                    TSS.SharpedJs.CookieManager.cookieBuf.add(cookieName, value);
                }
            }

        },
        containsCookie: function (cookieName) {
            if (this.getIsCookiesEnabled()) {
                return !Bridge.referenceEquals(undefined, HelperForGetCookie(cookieName));
            } else {
                return TSS.SharpedJs.CookieManager.cookieBuf.containsKey(cookieName);
            }
        }
    });

    Bridge.define("TSS.SharpedJs.DrawerUniverse", {
        universeInfoFontSizeSetter: null,
        squareSideSize: 0,
        thicknessSize: 0,
        squareHalfSideSize: 0,
        squareHalfSideSizeDec: 0,
        squareHalfOfHalfSideSizeDec: 0,
        squareHalfSideSizePlusThicknessSize: 0,
        squareSidePlusThickness: 0,
        canvasBackgroundColor: "#7B7B7B",
        emptySquareColor: "#F5F4F9",
        foodColor: "#05F44D",
        poisonColor: "#FEB049",
        deadCellColor: "#F40505",
        imageHeight: 0,
        imageWidth: 0,
        universeWidth: 0,
        universeHeight: 0,
        descriptorsWasBuf: null,
        useCircleForRender: true,
        percentOfCanvasWidthAtWindow: 0.7,
        config: {
            properties: {
                _Universe: null,
                CanvasElement: null,
                CanvasContext: null
            }
        },
        ctor: function (canvasElement, universeWidth, universeHeight) {
            this.$initialize();
            this.setCanvasElement(canvasElement);
            this.setCanvasContext(this.getCanvasElement().getContext("2d"));
            this.universeWidth = universeWidth;
            this.universeHeight = universeHeight;
            this.calcScreenConsts();

        },
        calcScreenConsts: function () {
            this.imageWidth = Bridge.Int.clip32(window.innerWidth * this.percentOfCanvasWidthAtWindow);
            this.imageHeight = (Bridge.Int.div(((this.universeHeight * this.imageWidth) | 0), this.universeWidth)) | 0;
            this.squareSideSize = Bridge.Int.clip32(((Bridge.Int.div(this.imageWidth, this.universeWidth)) | 0) * 0.95);
            this.squareHalfSideSize = (Bridge.Int.div(this.squareSideSize, 2)) | 0;
            this.squareHalfSideSizeDec = (this.squareHalfSideSize - 1) | 0;
            this.squareHalfOfHalfSideSizeDec = (Bridge.Int.div(this.squareHalfSideSizeDec, 2)) | 0;
            this.thicknessSize = Bridge.Int.clip32(((Bridge.Int.div(this.imageWidth, this.universeWidth)) | 0) * 0.05);
            if (this.squareHalfSideSizeDec < 1) {
                this.thicknessSize = 0;
                this.useCircleForRender = false;
                if (this.squareSideSize < 1) {
                    throw new System.Exception("Canvas size is too small for this universe.");
                }
            } else {
                this.useCircleForRender = true;
            }
            this.squareSidePlusThickness = (Bridge.Int.div(this.imageWidth, this.universeWidth)) | 0;
            this.squareHalfSideSizePlusThicknessSize = (this.squareHalfSideSize + this.thicknessSize) | 0;

            //reverse fix size of canvas
            this.imageWidth = (((this.squareSidePlusThickness * this.universeWidth) | 0) + this.thicknessSize) | 0;
            this.imageHeight = (((this.squareSidePlusThickness * this.universeHeight) | 0) + this.thicknessSize) | 0;

            this.getCanvasElement().width = this.imageWidth;
            this.getCanvasElement().height = this.imageHeight;

            var universeInfoFontSize = Bridge.Int.clip32(window.innerWidth * (1 - this.percentOfCanvasWidthAtWindow) / 24);
            !Bridge.staticEquals(this.universeInfoFontSizeSetter, null) ? this.universeInfoFontSizeSetter(universeInfoFontSize) : null;

            this.resetCanvas();

        },
        drawFrame: function (descriptors) {
            if (this.useCircleForRender) {
                for (var i = 0; i < this.universeWidth; i = (i + 1) | 0) {
                    for (var j = 0; j < this.universeHeight; j = (j + 1) | 0) {
                        if (this.descriptorsWasBuf != null && descriptors.get([i, j]) === this.descriptorsWasBuf.get([i, j])) {
                            continue;
                        }
                        this.drawUniverseObjectBig(this.getCanvasContext(), descriptors.get([i, j]), i, j);
                    }
                }
            } else {
                for (var i1 = 0; i1 < this.universeWidth; i1 = (i1 + 1) | 0) {
                    for (var j1 = 0; j1 < this.universeHeight; j1 = (j1 + 1) | 0) {
                        if (this.descriptorsWasBuf != null && descriptors.get([i1, j1]) === this.descriptorsWasBuf.get([i1, j1])) {
                            continue;
                        }
                        this.drawUniverseObjectSmall(this.getCanvasContext(), descriptors.get([i1, j1]), i1, j1);
                    }
                }
            }
            this.descriptorsWasBuf = descriptors;
        },
        resetCanvas: function () {
            if (this.thicknessSize > 0) {
                this.getCanvasContext().fillStyle = this.canvasBackgroundColor;
                this.getCanvasContext().fillRect(0, 0, this.imageWidth, this.imageHeight);
                for (var i = 0; i < this.universeWidth; i = (i + 1) | 0) {
                    for (var j = 0; j < this.universeHeight; j = (j + 1) | 0) {
                        this.clearSquare(this.getCanvasContext(), i, j);
                    }
                }
            } else {
                this.getCanvasContext().fillStyle = this.emptySquareColor;
                this.getCanvasContext().fillRect(0, 0, this.imageWidth, this.imageHeight);
            }
            this.descriptorsWasBuf = null;
        },
        drawUniverseObjectBig: function (canvasContext, descriptor, xAtUniverse, yAtUniverse) {
            //CanvasContext.FillStyle = GraphicsHelper.CssColorFromInt(descriptor);
            this.clearSquare(canvasContext, xAtUniverse, yAtUniverse);
            if (descriptor === 0) {

            } else if (descriptor < 0) {
                if (descriptor === -1) {
                    this.drawCircleWithWhiteWhole(canvasContext, this.foodColor, xAtUniverse, yAtUniverse);
                } else if (descriptor === -2) {
                    this.drawCircleWithWhiteWhole(canvasContext, this.deadCellColor, xAtUniverse, yAtUniverse);
                } else {
                    this.drawCircleWithWhiteWhole(canvasContext, this.poisonColor, xAtUniverse, yAtUniverse);
                }
            } else {
                this.drawCircle(canvasContext, TSS.SharpedJs.GraphicsHelper.cssColorFromInt(descriptor), xAtUniverse, yAtUniverse);
            }
        },
        drawUniverseObjectSmall: function (canvasContext, descriptor, xAtUniverse, yAtUniverse) {
            //CanvasContext.FillStyle = GraphicsHelper.CssColorFromInt(descriptor);
            this.clearSquare(canvasContext, xAtUniverse, yAtUniverse);
            if (descriptor === 0) {

            } else if (descriptor < 0) {
                if (descriptor === -1) {
                    this.drawSquare(canvasContext, this.foodColor, xAtUniverse, yAtUniverse);
                } else if (descriptor === -2) {
                    this.drawSquare(canvasContext, this.deadCellColor, xAtUniverse, yAtUniverse);
                } else {
                    this.drawSquare(canvasContext, this.poisonColor, xAtUniverse, yAtUniverse);
                }
            } else {
                this.drawSquare(canvasContext, TSS.SharpedJs.GraphicsHelper.cssColorFromInt(descriptor), xAtUniverse, yAtUniverse);
            }
        },
        drawSquare: function (canvasContext, color, xAtUniverse, yAtUniverse) {

            canvasContext.fillStyle = color;
            canvasContext.fillRect(((this.thicknessSize + ((this.squareSidePlusThickness * xAtUniverse) | 0)) | 0), ((this.thicknessSize + ((this.squareSidePlusThickness * yAtUniverse) | 0)) | 0), this.squareSideSize, this.squareSideSize);
        },
        drawCircle: function (canvasContext, color, xAtUniverse, yAtUniverse) {
            this.getCanvasContext().beginPath();
            canvasContext.strokeStyle = color;
            canvasContext.ellipse(((this.squareHalfSideSizePlusThicknessSize + ((this.squareSidePlusThickness * xAtUniverse) | 0)) | 0), ((this.squareHalfSideSizePlusThicknessSize + ((this.squareSidePlusThickness * yAtUniverse) | 0)) | 0), this.squareHalfSideSizeDec, this.squareHalfSideSizeDec, 0, 0, 6.29);
            canvasContext.fillStyle = color;
            canvasContext.fill();
            canvasContext.closePath();
            canvasContext.stroke();
        },
        drawCircleWithWhiteWhole: function (canvasContext, color, xAtUniverse, yAtUniverse) {
            this.getCanvasContext().beginPath();
            var posX = (this.squareHalfSideSizePlusThicknessSize + ((this.squareSidePlusThickness * xAtUniverse) | 0)) | 0;
            var posY = (this.squareHalfSideSizePlusThicknessSize + ((this.squareSidePlusThickness * yAtUniverse) | 0)) | 0;
            canvasContext.strokeStyle = color;
            canvasContext.ellipse(posX, posY, this.squareHalfSideSizeDec, this.squareHalfSideSizeDec, 0, 0, 6.29);
            canvasContext.fillStyle = color;
            canvasContext.fill();
            canvasContext.closePath();
            canvasContext.stroke();

            if (this.squareHalfOfHalfSideSizeDec > 0) {
                this.getCanvasContext().beginPath();
                canvasContext.ellipse(posX, posY, this.squareHalfOfHalfSideSizeDec, this.squareHalfOfHalfSideSizeDec, 0, 0, 6.29);
                canvasContext.fillStyle = "white";
                canvasContext.fill();
                canvasContext.closePath();
                canvasContext.stroke();
            }
        },
        clearSquare: function (canvasContext, xAtUniverse, yAtUniverse) {
            this.drawSquare(canvasContext, this.emptySquareColor, xAtUniverse, yAtUniverse);
        }
    });

    Bridge.define("TSS.SharpedJs.FoodType", {
        $kind: "enum",
        statics: {
            poison: 0,
            deadCell: 1,
            defaultFood: 2
        }
    });

    Bridge.define("TSS.SharpedJs.GameMainDispatcher", {
        userInterface: null,
        god: null,
        runGame: function () {
            this.parseInputValues();
            this.userInterface = TSS.SharpedJs.UniverseOutputUIElement.getDefInstance();
            this.setLangFromCookie();
            this.initializeLangChangeUrl();
            this.initializeLabels();
            this.god = new TSS.SharpedJs.GameOutputDispatcher(this.userInterface);


        },
        setLangFromCookie: function () {
            var $t;
            var lang = null;
            if (TSS.SharpedJs.CookieManager.getInstance().containsCookie("lang")) {
                lang = ($t = TSS.SharpedJs.CookieManager.getInstance().getValue("lang")) != null ? $t.toString() : null;
            }
            if (Bridge.referenceEquals(lang, "ru")) {
                TSS.SharpedJs.LanguageHandler.setLanguage(TSS.SharpedJs.LanguageHandlerCulture.ru);
            } else {
                TSS.SharpedJs.LanguageHandler.setLanguage(TSS.SharpedJs.LanguageHandlerCulture.en);
            }
        },
        initializeLangChangeUrl: function () {
            var changeLangUrl = Bridge.as(document.getElementById("changeLangUrl"), HTMLAnchorElement);
            if (System.String.equals(TSS.SharpedJs.CookieManager.getInstance().getValue("lang").toString(), "en")) {
                changeLangUrl.innerHTML = "Switch to Russian";
                changeLangUrl.href = System.String.concat(window.location.protocol, "//", window.location.host, window.location.pathname, "?lang=ru");
                (Bridge.as(document.getElementById("openManualUrl"), HTMLAnchorElement)).href = "./manual_en.docx";
            } else {
                changeLangUrl.innerHTML = "Switch to English";
                changeLangUrl.href = System.String.concat(window.location.protocol, "//", window.location.host, window.location.pathname, "?lang=en");
                (Bridge.as(document.getElementById("openManualUrl"), HTMLAnchorElement)).href = "./manual_ru.docx";
            }

        },
        initializeLabels: function () {
            (Bridge.as(this.userInterface.getButtonCreateNewUniverse(), HTMLInputElement)).value = TSS.SharpedJs.LanguageHandler.getInstance().buttonCreateUniverse;
            (Bridge.as(this.userInterface.getButtonStart(), HTMLInputElement)).value = TSS.SharpedJs.LanguageHandler.getInstance().buttonStarText;
            (Bridge.as(this.userInterface.getButtonStop(), HTMLInputElement)).value = TSS.SharpedJs.LanguageHandler.getInstance().buttonPauseText;
            (Bridge.as(this.userInterface.getButtonClearField(), HTMLInputElement)).value = TSS.SharpedJs.LanguageHandler.getInstance().buttonClearFieldText;
            (Bridge.as(this.userInterface.getButtonGenerateFoodOnAllField(), HTMLInputElement)).value = TSS.SharpedJs.LanguageHandler.getInstance().buttonGenerateFoodOnAllText;
            (Bridge.as(this.userInterface.getButtonGenerateCells(), HTMLInputElement)).value = TSS.SharpedJs.LanguageHandler.getInstance().buttonGenerateCellsText;
            (Bridge.as(this.userInterface.getButtonСonstsUniverseRedactor(), HTMLInputElement)).value = TSS.SharpedJs.LanguageHandler.getInstance().buttonConstsRedactorText;

            document.getElementById("labelUniverseInfo").innerHTML = TSS.SharpedJs.LanguageHandler.getInstance().tabItem_SimulationInfoHeader;
            document.getElementById("labelTimeout").innerHTML = TSS.SharpedJs.LanguageHandler.getInstance().labelDelayText;
            document.getElementById("labelGameControls").innerHTML = TSS.SharpedJs.LanguageHandler.getInstance().tabItem_GameHeader;
            document.getElementById("openManualUrl").innerHTML = TSS.SharpedJs.LanguageHandler.getInstance().labelOpenManual;
            document.title = TSS.SharpedJs.LanguageHandler.getInstance().titleOfUniverseOutputWindow;
        },
        parseInputValues: function () {
            //init def values in cookie manager
            this.getValueFromUrlOrCookie("lang", "en");
            this.getValueFromUrlOrCookie("w", 30);
            this.getValueFromUrlOrCookie("h", 22);
        },
        getValueFromUrlOrCookie: function (key, defValue) {
            var $t;
            if (defValue === void 0) { defValue = null; }
            var res = TSS.SharpedJs.UrlParamsManager.getParameter(key);
            if (res == null) {
                if (TSS.SharpedJs.CookieManager.getInstance().containsCookie(key)) {
                    res = TSS.SharpedJs.CookieManager.getInstance().getValue(key);
                }
            }
            res = ($t = res, $t != null ? $t : defValue);
            TSS.SharpedJs.CookieManager.getInstance().setValue(key, res);
            return res;
        }
    });

    Bridge.define("TSS.SharpedJs.GameOutputDispatcher", {
        universeOutputUIElement: null,
        universe: null,
        resumeGame: true,
        drawerUniverse: null,
        universeInfoPresenter: null,
        timeout: 0,
        windowTimePrev: 0,
        constsRedactorMessageDivBox: null,
        resumeGameBuf: false,
        ctor: function (universeOutputUIElement) {
            this.$initialize();
            this.universeOutputUIElement = universeOutputUIElement;
            this.initialize();
            var size = this.getDefaultUniverseSize();
            this.createUniverseAndPresenters(size.item1, size.item2);
            this.start();
        },
        start: function () {
            if (this.universe == null) {
                return;
            }
            this.resumeGame = true;
            this.tick();
        },
        stop: function () {
            this.resumeGame = false;
        },
        initTimeoutElement: function () {
            var ret = this.universeOutputUIElement.TSS$SharpedJs$IUniverseOutputUIElement$getRangeElementTimeout();
            //ret.Min = "0";
            //ret.Max = "5000";
            ret.onchange = Bridge.fn.combine(ret.onchange, Bridge.fn.bind(this, function () {
                this.universeOutputUIElement.TSS$SharpedJs$IUniverseOutputUIElement$getTimeoutSpan().innerHTML = ret.value;
                this.timeout = System.Convert.toInt32(ret.value);
            }));

        },
        initialize: function () {

            window.onresize = Bridge.fn.combine(window.onresize, Bridge.fn.bind(this, $asm.$.TSS.SharpedJs.GameOutputDispatcher.f1));

            //constsUniversePresenter = new ConstsUniversePresenter(universeOutputUIElement.ConstsUniverseRedactorElement, universe.ConstsUniverseProperty);
            this.universeOutputUIElement.TSS$SharpedJs$IUniverseOutputUIElement$getButtonStart().onclick = Bridge.fn.combine(this.universeOutputUIElement.TSS$SharpedJs$IUniverseOutputUIElement$getButtonStart().onclick, Bridge.fn.bind(this, $asm.$.TSS.SharpedJs.GameOutputDispatcher.f2));
            this.universeOutputUIElement.TSS$SharpedJs$IUniverseOutputUIElement$getButtonStop().onclick = Bridge.fn.combine(this.universeOutputUIElement.TSS$SharpedJs$IUniverseOutputUIElement$getButtonStop().onclick, Bridge.fn.bind(this, $asm.$.TSS.SharpedJs.GameOutputDispatcher.f3));
            this.universeOutputUIElement.TSS$SharpedJs$IUniverseOutputUIElement$getButtonClearField().onclick = Bridge.fn.combine(this.universeOutputUIElement.TSS$SharpedJs$IUniverseOutputUIElement$getButtonClearField().onclick, Bridge.fn.bind(this, $asm.$.TSS.SharpedJs.GameOutputDispatcher.f4));
            this.universeOutputUIElement.TSS$SharpedJs$IUniverseOutputUIElement$getButtonGenerateFoodOnAllField().onclick = Bridge.fn.combine(this.universeOutputUIElement.TSS$SharpedJs$IUniverseOutputUIElement$getButtonGenerateFoodOnAllField().onclick, Bridge.fn.bind(this, $asm.$.TSS.SharpedJs.GameOutputDispatcher.f5));

            this.universeOutputUIElement.TSS$SharpedJs$IUniverseOutputUIElement$getButtonCreateNewUniverse().onclick = Bridge.fn.combine(this.universeOutputUIElement.TSS$SharpedJs$IUniverseOutputUIElement$getButtonCreateNewUniverse().onclick, Bridge.fn.bind(this, $asm.$.TSS.SharpedJs.GameOutputDispatcher.f6));
            this.universeOutputUIElement.TSS$SharpedJs$IUniverseOutputUIElement$getButtonСonstsUniverseRedactor().onclick = Bridge.fn.combine(this.universeOutputUIElement.TSS$SharpedJs$IUniverseOutputUIElement$getButtonСonstsUniverseRedactor().onclick, Bridge.fn.bind(this, $asm.$.TSS.SharpedJs.GameOutputDispatcher.f7));
            this.universeOutputUIElement.TSS$SharpedJs$IUniverseOutputUIElement$getButtonGenerateCells().onclick = Bridge.fn.combine(this.universeOutputUIElement.TSS$SharpedJs$IUniverseOutputUIElement$getButtonGenerateCells().onclick, Bridge.fn.bind(this, $asm.$.TSS.SharpedJs.GameOutputDispatcher.f8));
            this.initTimeoutElement();


        },
        createUniverseAndPresenters: function (width, height) {
            this.drawerUniverse = null;
            this.universeInfoPresenter = null;
            this.universe != null ? this.universe.dispose() : null;
            this.universe = null;
            this.universe = new TSS.SharpedJs.Universe(width, height);
            TSS.SharpedJs.CookieManager.getInstance().setValue("w", width);
            TSS.SharpedJs.CookieManager.getInstance().setValue("h", height);
            this.drawerUniverse = new TSS.SharpedJs.DrawerUniverse(this.universeOutputUIElement.TSS$SharpedJs$IUniverseOutputUIElement$getCanvas(), this.universe.getWidth(), this.universe.getHeight());
            this.universeInfoPresenter = new TSS.SharpedJs.UniverseInfoPresenter(this.universeOutputUIElement.TSS$SharpedJs$IUniverseOutputUIElement$getUniverseInfoParagraph());

            //This code allow to update font size when drawer update size of canvas
            this.drawerUniverse.universeInfoFontSizeSetter = Bridge.fn.combine(this.drawerUniverse.universeInfoFontSizeSetter, Bridge.fn.bind(this, $asm.$.TSS.SharpedJs.GameOutputDispatcher.f9));

            this.drawerUniverse.calcScreenConsts();
        },
        showUniverseCreationDialog: function () {
            this.stop();

            var idWidth = System.String.concat("id", TSS.SharpedJs.StableRandom.rd.next$2(1000000, 9999999).toString());
            var idHeight = System.String.concat("id", TSS.SharpedJs.StableRandom.rd.next$2(1000000, 9999999).toString());
            var table = document.createElement('table');
            var widthAndHeight = this.getDefaultUniverseSize();
            var rowWidth = System.String.format("<tr><td>{0}</td><td><input type='text' id='{1}' value='{2}'></td></tr>", TSS.SharpedJs.LanguageHandler.getInstance().labelWidthText, idWidth, widthAndHeight.item1);
            var rowHeight = System.String.format("<tr><td>{0}</td><td><input type='text' id='{1}' value='{2}'></td></tr>", TSS.SharpedJs.LanguageHandler.getInstance().labelHeightText, idHeight, widthAndHeight.item2);
            var html = System.String.format("<table>{0}{1}</table>", rowWidth, rowHeight);

            table.innerHTML = html;
            var divContent = document.createElement('div');
            divContent.appendChild(table);

            var msgBox = new TSS.SharpedJs.MessageDivBox.ctor(divContent, 3);
            msgBox.setRemoveAutomaticaly(false);
            msgBox.setCallbackOnClose(Bridge.fn.bind(this, function (clickedButton) {
                if (clickedButton === TSS.SharpedJs.MessageDivBoxButton.Ok) {
                    var tbWidth = Bridge.as(document.getElementById(idWidth), HTMLInputElement);
                    var tbHeight = Bridge.as(document.getElementById(idHeight), HTMLInputElement);
                    var width = { v : -1 }, height = { v : -1 };
                    var convertationRes = System.Int32.tryParse(tbWidth.value, width) && System.Int32.tryParse(tbHeight.value, height);
                    if (convertationRes && this.checkUniverseSize(width.v, height.v)) {
                        msgBox.remove();
                        this.createUniverseAndPresenters(width.v, height.v);
                        this.start();
                    } else {
                        window.alert(TSS.SharpedJs.LanguageHandler.getInstance().universeSizeWarning);
                        msgBox.show();
                    }
                } else {
                    msgBox.remove();
                    this.start();
                    return;
                }
            }));

            msgBox.show();
        },
        showConstsUniverseRedactorDialog: function () {
            if (this.universe == null) {
                return;
            }

            this.resumeGameBuf = this.resumeGame;
            this.stop();

            if (this.constsRedactorMessageDivBox == null || this.constsRedactorMessageDivBox.getIsRemoved()) {
                var divContent = document.createElement('div');
                var header = document.createElement("h4");
                header.innerHTML = TSS.SharpedJs.LanguageHandler.getInstance().titleOfUniverseConstsRedactor;
                header.className = "consts-redactor-label";
                header.setAttribute("align", "center");
                divContent.appendChild(header);
                var table = document.createElement('table');
                table.className = "consts-redactor-table";

                divContent.appendChild(table);
                var constsUniversePresenter = new TSS.SharpedJs.ConstsUniversePresenter(divContent, this.universe.getConstsUniverseProperty());

                this.constsRedactorMessageDivBox = new TSS.SharpedJs.MessageDivBox.ctor(divContent, TSS.SharpedJs.MessageDivBoxButton.None);
                this.constsRedactorMessageDivBox.setRemoveAutomaticaly(false);
                constsUniversePresenter.setCallbackAfterSubmit(Bridge.fn.bind(this, $asm.$.TSS.SharpedJs.GameOutputDispatcher.f10));
                this.constsRedactorMessageDivBox.setCallbackOnClose(Bridge.fn.bind(this, $asm.$.TSS.SharpedJs.GameOutputDispatcher.f11));
            }

            this.constsRedactorMessageDivBox.show();
        },
        getDefaultUniverseSize: function () {
            var w = { v : 40 }, h = { v : 15 };
            System.Int32.tryParse(TSS.SharpedJs.CookieManager.getInstance().getValue("w").toString(), w);
            System.Int32.tryParse(TSS.SharpedJs.CookieManager.getInstance().getValue("h").toString(), h);
            if (!this.checkUniverseSize(w.v, h.v)) {
                w.v = 40;
                h.v = 15;
            }
            return { item1: w.v, item2: h.v };
        },
        checkUniverseSize: function (width, height) {
            return width >= 2 && width <= 200 && height >= 2 && height <= 200;
        },
        tick: function () {
            if (window.performance.now() - this.windowTimePrev > this.timeout) {
                this.windowTimePrev = window.performance.now();
                try {
                    this.universe.doUniverseTick();
                    this.drawerUniverse.drawFrame(this.universe.getAllDescriptors());
                    //if (screenSizeChanged)
                    //{
                    //    screenSizeChanged = false;
                    //    drawerUniverse.CalcScreenConsts();
                    //}
                    this.universeInfoPresenter.writeUniverseInfo(this.universe);
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                }
            }

            if (this.resumeGame) {
                window.requestAnimationFrame(Bridge.fn.cacheBind(this, this.tick));
            }
        }
    });

    Bridge.ns("TSS.SharpedJs.GameOutputDispatcher", $asm.$);

    Bridge.apply($asm.$.TSS.SharpedJs.GameOutputDispatcher, {
        f1: function () {
            //screenSizeChanged = true;
            this.drawerUniverse.calcScreenConsts();
            if (this.constsRedactorMessageDivBox != null) {
                var isOpened = this.constsRedactorMessageDivBox.getIsOpened();
                this.constsRedactorMessageDivBox.close();
                if (isOpened) {
                    this.constsRedactorMessageDivBox.show();
                }
            }
        },
        f2: function () {
            this.start();
        },
        f3: function () {
            this.stop();
        },
        f4: function () {
            this.universe.clearField();
        },
        f5: function () {
            this.universe.generateFoodOnAllField();
        },
        f6: function () {
            this.showUniverseCreationDialog();
        },
        f7: function () {
            this.showConstsUniverseRedactorDialog();
        },
        f8: function () {
            var tbValue = { };
            if (System.Int32.tryParse(this.universeOutputUIElement.TSS$SharpedJs$IUniverseOutputUIElement$getTextBoxCellsCount().value, tbValue) && tbValue.v < 300) {
                this.universe.generateCells(tbValue.v);
            } else {
                window.alert(TSS.SharpedJs.LanguageHandler.getInstance().cellsCountWarningMessage);
            }
        },
        f9: function (fontSize) {
            this.universeInfoPresenter != null ? this.universeInfoPresenter.setFontSize(fontSize) : null;
            //Document.GetElementById("rightPanel").Style.FontSize = fontSize.ToString()+"px";
            document.body.style.fontSize = System.String.concat(fontSize.toString(), "px");
        },
        f10: function () {
            this.constsRedactorMessageDivBox.close();
            if (this.resumeGameBuf) {
                this.start();
            }
            this.constsRedactorMessageDivBox != null ? this.constsRedactorMessageDivBox.remove() : null;
        },
        f11: function () {
            if (this.resumeGameBuf) {
                this.start();
            }
            this.constsRedactorMessageDivBox != null ? this.constsRedactorMessageDivBox.remove() : null;
        }
    });

    /**
     * Storage of cell data.
     <p />
     ��������� ������ � ������.
     *
     * @class TSS.SharpedJs.Genome
     */
    Bridge.define("TSS.SharpedJs.Genome", {
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
            TSS.SharpedJs.Genome.ctor.call(this, constsUniverse.getCellGenome_Hunger(), constsUniverse.getCellGenome_Aggression(), constsUniverse.getCellGenome_Reproduction(), constsUniverse.getCellGenome_Friendly(), constsUniverse.getCellGenome_PoisonAddiction(), constsUniverse.getCellGenome_CorpseAddiction());
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
         * @this TSS.SharpedJs.Genome
         * @memberof TSS.SharpedJs.Genome
         * @return  {TSS.SharpedJs.Genome}
         */
        clone: function () {
            return new TSS.SharpedJs.Genome.ctor(this.hunger, this.aggression, this.reproduction, this.friendly, this.poisonAddiction, this.corpseAddiction);
        },
        /**
         * This method clone genome and change some values.
         <p />
         ���� ����� ��������� �����, ������� ��������� ��� ��������.
         *
         * @instance
         * @public
         * @this TSS.SharpedJs.Genome
         * @memberof TSS.SharpedJs.Genome
         * @param   {number}                  Mutation_ChangedValuesAtOne
         * @return  {TSS.SharpedJs.Genome}
         */
        cloneAndMutate: function (Mutation_ChangedValuesAtOne) {
            var modificator;
            var hunger = this.hunger, aggression = this.aggression, reproduction = this.reproduction, friendly = this.friendly;

            for (var i = 0; i < Mutation_ChangedValuesAtOne; i = (i + 1) | 0) {
                if (TSS.SharpedJs.StableRandom.rd.next$1(2) === 0) {
                    modificator = -1;
                } else {
                    modificator = 1;
                }
                switch (TSS.SharpedJs.StableRandom.rd.next$2(1, 7)) {
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
            return new TSS.SharpedJs.Genome.ctor(hunger, aggression, reproduction, friendly, this.poisonAddiction, this.corpseAddiction);
        }
    });

    Bridge.define("TSS.SharpedJs.GraphicsHelper", {
        statics: {
            cssColorFromInt: function (num) {
                var byteArr = TSS.SharpedJs.GraphicsHelper.intToBytes(num);
                return System.String.format("#{0:X2}{1:X2}{2:X2}", byteArr[1], byteArr[2], byteArr[3]);
            },
            intToBytes: function (num) {
                var res = System.Array.init(4, 0, System.Byte);

                res[0] = (num >> 24) & 255;
                res[1] = (num >> 16) & 255;
                res[2] = (num >> 8) & 255;
                res[3] = num & 255;
                return res;
            }
        }
    });

    Bridge.define("TSS.SharpedJs.IUniverseOutputUIElement", {
        $kind: "interface"
    });

    /**
     * This class I used for localizing application. Maybe there is an easier way, but I was too lazy to search it, I admit.
     <p />
     Этот класс я использовал для локализаии приложения. Может есть способ проще, но мне было лень разбиратся, признаю.
     *
     * @class TSS.SharpedJs.LanguageHandler
     */
    Bridge.define("TSS.SharpedJs.LanguageHandler", {
        statics: {
            lh: null,
            WindowTitlesPrefix: "TSS - ",
            config: {
                init: function () {
                    this.lh = new TSS.SharpedJs.LanguageHandler(TSS.SharpedJs.LanguageHandlerCulture.en);
                }
            },
            getInstance: function () {
                if (TSS.SharpedJs.LanguageHandler.lh == null) {
                    TSS.SharpedJs.LanguageHandler.setLanguage(TSS.SharpedJs.LanguageHandlerCulture.ru);
                }
                return TSS.SharpedJs.LanguageHandler.lh;
            },
            setLanguage: function (languageHandlerCulture) {
                TSS.SharpedJs.LanguageHandler.lh = new TSS.SharpedJs.LanguageHandler(languageHandlerCulture);
            }
        },
        universeInfoStringFormatter: "Width:{0};\nHeight:{1};\nTotal cell count:{2};\nTotal energy in universe:{3};\nTick number:{4};\nCount of cell types:{5}\nMost fit cell info:",
        cellInfoStringFormatter: "Genome:\n\thunger:{0},\n\taggression:{1},\n\treproduction:{2},\n\tcollectivity:{3},\n\tpoison addiction:{4},\n\tcorpse addiction:{5};\nCount with this genome:{6};\nColor:",
        titleOfUniverseConstsRedactor: "Universe consts redactor",
        cellInfoWindowTitle: "TSS - Cell info",
        fieldRedactorSizeWarning: "Universe size is too big for this option.",
        applyButtonText: "Apply",
        modalWindowAboutFoodPlace: "TSS - Food place redactor",
        modalWindowAboutPoisonPlace: "TSS - Poison place redactor",
        checkAllButton: "Check all",
        uncheckAllButton: "Uncheck all",
        incorrectValueMsg: "Value at field \"{0}\" is incorrect. ",
        incorrectRangeMsg: "Value of \"{0}\" must be at range from {1} to {2}. ",
        constsUniverseFileCorrupted: "The configuration file is corrupted or can`t be opened. Overwrite it?",
        universeFileCorrupted: "The universe file is corrupted or can`t be opened.",
        cellsCountWarningMessage: "Can`t create cells. Count of cells is a natural number.",
        resolutionWarningMessage: "Set width and height of resolution in range from 100 to 2000.",
        titleOfUniverseOutputWindow: "TSS - Simulation",
        tabItem_SimulationInfoHeader: "Simulation info",
        tabItem_GameHeader: "Game",
        tabItem_ControlsHeader: "Controls",
        buttonClearFieldText: "Clear field",
        buttonConstsRedactorText: "Consts redactor",
        buttonFoodPlaceRedactotText: "Food place redactor",
        buttonGenerateCellsText: "Generate cells",
        buttonGenerateFoodOnAllText: "Generate food on all field",
        buttonPauseText: "Pause",
        buttonPosinPlaceRedactotText: "Poison place redactor",
        buttonResetResolutionText: "Set resolution",
        buttonSaveUniverseText: "Save universe",
        buttonStarText: "Start",
        labelCellsCountText: "Cells count",
        labelDelayText: "Delay",
        labelHeightText: "Height",
        labelWidthText: "Width",
        buttonOk: "OK",
        buttonCancel: "Cancel",
        universeSizeWarning: "Universe side must be at range from 2 to 200.",
        outOfMemory: "Out of memory. We need to close simulation.",
        buttonCreateUniverse: "Create universe",
        buttonLoadUniverse: "Load universe",
        buttonAbout: "About",
        aboutText: "You can read how to play in manual in game folder.\nAuthor contacts\n\tMail: yuram1box@gmail.com\n\tVk: vk.com/yura_mysko \n\tTelephone: +380987739725",
        mainWindowTitle: "TSS - Main window",
        labelOpenManual: "Open manual",
        ctor: function (language) {
            this.$initialize();

            switch (language) {
                case TSS.SharpedJs.LanguageHandlerCulture.en: 
                    if (TSS.SharpedJs.CookieManager.getInstance().getIsCookiesEnabled()) {
                        TSS.SharpedJs.CookieManager.getInstance().setValue("lang", "en");
                    }
                    this.initLanguage_En();
                    break;
                case TSS.SharpedJs.LanguageHandlerCulture.ru: 
                    if (TSS.SharpedJs.CookieManager.getInstance().getIsCookiesEnabled()) {
                        TSS.SharpedJs.CookieManager.getInstance().setValue("lang", "ru");
                    }
                    this.initLanguage_Ru();
                    break;
            }
        },
        initLanguage_En: function () {
            this.universeInfoStringFormatter = "Width:{0};\nHeight:{1};\nTotal cell count:{2};\nTotal energy in universe:{3};\nTick number:{4};\nCount of cell types:{5}\nMost fit cell type:";
            this.cellInfoStringFormatter = "Genome:\n\thunger:{0},\n\taggression:{1},\n\treproduction:{2},\n\tcollectivity:{3},\n\tpoison addiction:{4},\n\tcorpse addiction:{5};\nCount with this genome:{6};\nColor:";
            this.titleOfUniverseConstsRedactor = "Universe consts redactor";
            this.cellInfoWindowTitle = "TSS - Cell info";
            this.fieldRedactorSizeWarning = "Universe size is too big for this option.";
            this.applyButtonText = "Apply";
            this.modalWindowAboutFoodPlace = "TSS - Food place redactor";
            this.modalWindowAboutPoisonPlace = "TSS - Poison place redactor";
            this.checkAllButton = "Check all";
            this.uncheckAllButton = "Uncheck all";
            this.incorrectValueMsg = "Value at field \"{0}\" is incorrect.";
            this.incorrectRangeMsg = "Value of \"{0}\" must be at range from {1} to {2}. ";
            this.constsUniverseFileCorrupted = "The configuration file is corrupted or can`t be opened. Overwrite it?";
            this.universeFileCorrupted = "The universe file is corrupted or can`t be opened.";
            this.cellsCountWarningMessage = "Can`t create cells. Count of cells is a natural number < 300.";
            this.resolutionWarningMessage = "Set width and height of resolution in range from 100 to 2000.";
            this.titleOfUniverseOutputWindow = "TSS - Simulation";
            this.tabItem_SimulationInfoHeader = "Simulation info";
            this.tabItem_GameHeader = "Game";
            this.tabItem_ControlsHeader = "Controls";
            this.buttonClearFieldText = "Clear field";
            this.buttonConstsRedactorText = "Consts redactor";
            this.buttonFoodPlaceRedactotText = "Food place redactor";
            this.buttonGenerateCellsText = "Generate cells";
            this.buttonGenerateFoodOnAllText = "Generate food on all field";
            this.buttonPauseText = "Pause";
            this.buttonPosinPlaceRedactotText = "Poison place redactor";
            this.buttonResetResolutionText = "Set resolution";
            this.buttonSaveUniverseText = "Save universe";
            this.buttonStarText = "Start";
            this.labelCellsCountText = "Cells count";
            this.labelDelayText = "Delay";
            this.labelHeightText = "Height";
            this.labelWidthText = "Width";
            this.buttonOk = "Ok";
            this.buttonCancel = "Cancel";
            this.universeSizeWarning = "Universe side must be number at range from 2 to 200.";
            this.outOfMemory = "The application uses too much memory. We need to close simulation.";
            this.buttonCreateUniverse = "Create universe";
            this.buttonLoadUniverse = "Load universe";
            this.buttonAbout = "About";
            this.aboutText = "You can read how to play in manual in game folder.\nAuthor contacts\n\tMail: yuram1box@gmail.com\n\tVk: vk.com/yura_mysko \n\tTelephone: +380987739725";
            this.mainWindowTitle = "TSS - Main window";
            this.labelOpenManual = "Open manual";
        },
        initLanguage_Ru: function () {
            this.universeInfoStringFormatter = "Ширина:{0};\nДлина:{1};\nКлеток на поле:{2};\nВсего энергии во вселенной:{3};\nНомер тика:{4};\nВсего типов клеток:{5}\nСамый успешный тип клеток:";
            this.cellInfoStringFormatter = "Геном:\n\tГолод:{0},\n\tАгрессия:{1},\n\tРепродуктивность:{2},\n\tКоллективность:{3},\n\tТяга к яду:{4},\n\tТяга к мертвым клеткам:{5};\nКоличество клеток с этим геномом:{6};\nЦвет:";
            this.titleOfUniverseConstsRedactor = "Редактор констант вселенной";
            this.cellInfoWindowTitle = "TSS - Информация ок клетке";
            this.fieldRedactorSizeWarning = "Размер вселенной слишком большой чтобы использовать эту функцию.";
            this.applyButtonText = "Подтвердить";
            this.modalWindowAboutFoodPlace = "TSS - Редактор размещения еды";
            this.modalWindowAboutPoisonPlace = "TSS - Редактор размещения  яда";
            this.checkAllButton = "Отметить все";
            this.uncheckAllButton = "Убрать отмеченное";
            this.incorrectValueMsg = "Значение поля \"{0}\" некорректно. ";
            this.incorrectRangeMsg = "Значение поля \"{0}\" должно быть числом в промежутке от {1} до {2}. ";
            this.constsUniverseFileCorrupted = "Файл настроек поврежден или не может быть открыт. Перезаписать его?";
            this.universeFileCorrupted = "Файл со вселенной поврежден или не может быть открыт.";
            this.cellsCountWarningMessage = "Создание клеток невозможно. Количество клеток - натуральное число  < 300.";
            this.resolutionWarningMessage = "Ширина и длина должно быть числом в промежутке от 100 до 2000.";
            this.titleOfUniverseOutputWindow = "TSS - Симуляция";
            this.tabItem_SimulationInfoHeader = "Статистика";
            this.tabItem_GameHeader = "Игра";
            this.tabItem_ControlsHeader = "Управление";
            this.buttonClearFieldText = "Очистить поле";
            this.buttonConstsRedactorText = "Редактор констант";
            this.buttonFoodPlaceRedactotText = "Редактор размещения еды";
            this.buttonGenerateCellsText = "Сгенерировать клетки";
            this.buttonGenerateFoodOnAllText = "Заполнить поле едой";
            this.buttonPauseText = "Пауза";
            this.buttonPosinPlaceRedactotText = "Редактор размещения яда";
            this.buttonResetResolutionText = "Сменить разрешение";
            this.buttonSaveUniverseText = "Сохранить вселенную";
            this.buttonStarText = "Старт";
            this.labelCellsCountText = "Кол. клеток";
            this.labelDelayText = "Задержка";
            this.labelHeightText = "Длина";
            this.labelWidthText = "Ширина";
            this.buttonOk = "Ок";
            this.buttonCancel = "Отмена";
            this.universeSizeWarning = "Сторона вселенной должна быть числом в промежутке от 2 до 200.";
            this.outOfMemory = "Приложение использует слишком много оперативной памяти. Мы вынуждены остановить симуляцию.";
            this.buttonCreateUniverse = "Создать вселенную";
            this.buttonLoadUniverse = "Загрузить вселенную";
            this.buttonAbout = "Справка";
            this.aboutText = "Вы можете прочитать информацию об игре в мануале в папке с игрой.\nСвязь с автором\n\tПочта: yuram1box@gmail.com\n\tВк: vk.com/yura_mysko \n\tТелефон: +380987739725";
            this.mainWindowTitle = "TSS - Главное окно";
            this.labelOpenManual = "Открыть мануал";
        }
    });

    Bridge.define("TSS.SharpedJs.LanguageHandlerCulture", {
        $kind: "enum",
        statics: {
            en: 0,
            ru: 1
        }
    });

    Bridge.define("TSS.SharpedJs.MessageDivBox", {
        modalMainDivField: null,
        config: {
            properties: {
                CallbackOnClose: null,
                IsRemoved: false,
                IsOpened: false,
                RemoveAutomaticaly: true
            }
        },
        ctor: function (msgDiv, buttonsFlag) {
            this.$initialize();
            this.initialize(msgDiv, buttonsFlag);
        },
        $ctor1: function (msgHtml) {
            this.$initialize();
            var msgDiv = document.createElement('div');
            msgDiv.innerHTML = msgHtml;
            this.initialize(msgDiv, TSS.SharpedJs.MessageDivBoxButton.Ok);
        },
        $ctor2: function (msgHtml, buttonsFlag) {
            this.$initialize();
            var msgDiv = document.createElement('div');
            msgDiv.innerHTML = msgHtml;
            this.initialize(msgDiv, buttonsFlag);
        },
        initialize: function (msgDiv, buttonsFlag) {
            var modalMainDiv = document.createElement('div');
            this.modalMainDivField = modalMainDiv;
            modalMainDiv.className = "modal";
            modalMainDiv.setAttribute("align", "center");
            var modalContenDiv = msgDiv;
            modalContenDiv.className = "modal-content";
            var span = document.createElement('span');
            span.innerHTML = "&times;";
            span.className = "close-modal";
            var divHeader = document.createElement('div');
            divHeader.appendChild(span);
            divHeader.className = "modal-header";
            modalContenDiv.insertBefore(divHeader, modalContenDiv.firstChild);
            //modalMainDiv.AppendChild(divHeader);
            modalMainDiv.appendChild(modalContenDiv);

            var footerDiv = this.createButtonsDiv(buttonsFlag);
            if (footerDiv != null) {
                modalContenDiv.appendChild(footerDiv);
            }

            this.close();
            document.body.appendChild(modalMainDiv);

            span.onclick = Bridge.fn.combine(span.onclick, Bridge.fn.bind(this, $asm.$.TSS.SharpedJs.MessageDivBox.f1));
        },
        createButtonsDiv: function (buttonsFlag) {
            if (System.Enum.hasFlag(buttonsFlag, TSS.SharpedJs.MessageDivBoxButton.None)) {
                return null;
            }

            var res = document.createElement('div');
            res.className = "modal-footer";
            res.setAttribute("align", "left");
            var buttonsTable = document.createElement('table');
            res.appendChild(buttonsTable);
            var buttonsRow = document.createElement('tr');
            buttonsTable.appendChild(buttonsRow);

            if (System.Enum.hasFlag(buttonsFlag, TSS.SharpedJs.MessageDivBoxButton.Ok)) {
                buttonsRow.appendChild(this.createButton(TSS.SharpedJs.LanguageHandler.getInstance().buttonOk, TSS.SharpedJs.MessageDivBoxButton.Ok));
            }
            if (System.Enum.hasFlag(buttonsFlag, TSS.SharpedJs.MessageDivBoxButton.Cancel)) {
                buttonsRow.appendChild(this.createButton(TSS.SharpedJs.LanguageHandler.getInstance().buttonCancel, TSS.SharpedJs.MessageDivBoxButton.Cancel));
            }
            return res;
        },
        createButton: function (caption, buttonDesc) {
            var res = document.createElement('td');

            var button = document.createElement('button');
            button.textContent = caption;
            button.onclick = Bridge.fn.combine(button.onclick, Bridge.fn.bind(this, function () {
                var $t;
                this.close();
                !Bridge.staticEquals(($t = this.getCallbackOnClose()), null) ? $t(buttonDesc) : null;
                if (this.getRemoveAutomaticaly()) {
                    this.remove();
                }
            }));
            button.style.margin = "10px 10px 0px 0px";
            res.appendChild(button);
            return res;
        },
        /**
         * Not block calling thread.
         *
         * @instance
         * @public
         * @this TSS.SharpedJs.MessageDivBox
         * @memberof TSS.SharpedJs.MessageDivBox
         * @return  {void}
         */
        show: function () {
            if (this.getIsRemoved()) {
                return;
            }
            this.setIsOpened(true);
            this.modalMainDivField.style.display = "block";
        },
        close: function () {
            if (this.getIsRemoved()) {
                return;
            }
            this.setIsOpened(false);
            this.modalMainDivField.style.display = "none";
        },
        remove: function () {
            if (this.getIsRemoved()) {
                return;
            }
            this.close();
            this.setIsRemoved(true);
            this.modalMainDivField.remove();
        }
    });

    Bridge.ns("TSS.SharpedJs.MessageDivBox", $asm.$);

    Bridge.apply($asm.$.TSS.SharpedJs.MessageDivBox, {
        f1: function () {
            var $t;
            this.close();
            !Bridge.staticEquals(($t = this.getCallbackOnClose()), null) ? $t(TSS.SharpedJs.MessageDivBoxButton.Cancel) : null;
            if (this.getRemoveAutomaticaly()) {
                this.remove();
            }
        }
    });

    Bridge.define("TSS.SharpedJs.MessageDivBoxButton", {
        $kind: "enum",
        statics: {
            Ok: 1,
            Cancel: 2,
            None: 8
        },
        $flags: true
    });

    /**
     * Quite an interesting class. IFormattable makes it clear that it is converted to a string.
     But to reverse the action I had to do Parseble attribute that makes it clear for ValuesRedactor,
     that this type has a method "public static MinMaxInt Parse(string str)".
     <p />
     Довольно интересный класс. IFormattable дает понять, что он конвертируется в строку.
     Но вот для обратного действия мне пришлось сделать атрибут Parseble, который дает понять ValuesRedactor,
     что этот тип имеет метод "public static MinMaxInt Parse(string str)".
     *
     * @class TSS.SharpedJs.MinMaxInt
     * @implements  System.IFormattable
     */
    Bridge.define("TSS.SharpedJs.MinMaxInt", {
        inherits: [System.IFormattable],
        statics: {
            parse: function (str) {
                try {
                    var arr = str.split(String.fromCharCode(47));
                    var res = new TSS.SharpedJs.MinMaxInt.ctor();
                    res.min = System.Convert.toInt32(arr[0]);
                    res.max = System.Convert.toInt32(arr[1]);
                    return res;
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                    //I don`t now why, but program doesn`t throw this exception here.
                    throw new System.Exception("Can`t parse to MinMaxInt!");
                }
            }
        },
        min: 0,
        max: 0,
        config: {
            alias: [
            "format", "System$IFormattable$format"
            ]
        },
        ctor: function () {
            this.$initialize();
        },
        $ctor1: function (min, max) {
            this.$initialize();
            this.min = min;
            this.max = max;
        },
        format: function (format, provider) {
            if (format === void 0) { format = null; }
            if (provider === void 0) { provider = null; }
            return System.String.concat(this.min.toString(), "/", this.max.toString());
        }
    });

    Bridge.define("TSS.SharpedJs.MoveDirection", {
        $kind: "enum",
        statics: {
            stand: 0,
            up: 1,
            down: 2,
            left: 3,
            right: 4
        }
    });

    Bridge.define("TSS.SharpedJs.NoInfoAttribute", {
        inherits: [System.Attribute]
    });

    /**
     * Gives to ValuesRedactor an idea of how to display the class fields.
     <p />
     Дает ValuesRedactor представление о том, как отображать поле класса.
     *
     * @class TSS.SharpedJs.NumericValuesAttribute
     * @augments System.Attribute
     */
    Bridge.define("TSS.SharpedJs.NumericValuesAttribute", {
        inherits: [System.Attribute],
        wayToShow: 0,
        min: 0,
        max: 0,
        config: {
            init: function () {
                this.min = System.Double.min;
                this.max = System.Double.max;
            }
        },
        ctor: function (min, max) {
            this.$initialize();
            System.Attribute.ctor.call(this);
            this.min = min;
            this.max = max;
        },
        $ctor1: function (min, max, wayToShow) {
            this.$initialize();
            System.Attribute.ctor.call(this);
            this.min = min;
            this.max = max;
            this.wayToShow = wayToShow;
        },
        $ctor2: function (wayToShow) {
            this.$initialize();
            System.Attribute.ctor.call(this);
            this.wayToShow = wayToShow;
        }
    });

    Bridge.define("TSS.SharpedJs.NumericValuesWayToShow", {
        $kind: "enum",
        statics: {
            Default: 0,
            Slider: 1
        }
    });

    /**
     * Attribute makes it clear for ValuesRedactor that this type has a method "public static T Parse (string str)", where T - the type of current object.
     With this attribute, you can create your own attributes, working in ValuesRedactor.
     <p />
     Атрибут дает понять ValuesRedactor что этот тип имеет метод "public static T Parse(string str)", где T - данный тип.
     С этим атрибутом вы можете создавать свои атрибуты, работающие в ValuesRedactor.
     *
     * @class TSS.SharpedJs.ParsebleAttribute
     * @augments System.Attribute
     */
    Bridge.define("TSS.SharpedJs.ParsebleAttribute", {
        inherits: [System.Attribute],
        statics: {
            parse: function (str, typeToConvert) {
                var parseMethod = Bridge.Reflection.getMembers(typeToConvert, 8, 24 | 256, "Parse");
                if (parseMethod == null || !Bridge.Reflection.isAssignableFrom(typeToConvert, parseMethod.rt)) {
                    throw new TSS.SharpedJs.ParsebleException.$ctor1("Parseble must have a public static method \"Parse\" which get string and create from it new object with this type(Parseble type)!");
                }
                return Bridge.Reflection.midel(parseMethod, null)(str);
            }
        }
    });

    Bridge.define("TSS.SharpedJs.ParsebleException", {
        inherits: [System.Exception],
        config: {
            properties: {
                MessageForUser: null
            }
        },
        $ctor2: function (msg, messageForUser) {
            this.$initialize();
            System.Exception.ctor.call(this, msg);
            this.setMessageForUser(messageForUser);
        },
        ctor: function () {
            this.$initialize();
            System.Exception.ctor.call(this);

        },
        $ctor1: function (msg) {
            this.$initialize();
            System.Exception.ctor.call(this, msg);

        }
    });

    /**
     * The classes in this file is used by all application.
     <p />
     Классы из этого файла используются всем приложением.
     *
     * @class TSS.SharpedJs.PointInt
     */
    Bridge.define("TSS.SharpedJs.PointInt", {
        x: 0,
        y: 0,
        ctor: function () {
            this.$initialize();
        },
        $ctor1: function (x, y) {
            this.$initialize();
            this.x = x;
            this.y = y;
        }
    });

    Bridge.define("TSS.SharpedJs.StableRandom", {
        statics: {
            rd: null,
            config: {
                init: function () {
                    this.rd = new System.Random.ctor();
                }
            }
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
     * @class TSS.SharpedJs.Universe
     */
    Bridge.define("TSS.SharpedJs.Universe", {
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
                this.cellList = new (System.Collections.Generic.List$1(TSS.SharpedJs.Cell))(0);
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
            this.setConstsUniverseProperty(TSS.SharpedJs.ConstsUniverse.create());
            this.universeMatrix = System.Array.create(null, null, TSS.SharpedJs.UniverseObject, width, height);
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
            var $t;
            this.disposed = true;
            for (var i = 0; i < this.width; i = (i + 1) | 0) {
                for (var j = 0; j < this.height; j = (j + 1) | 0) {
                    ($t = this.getMatrixElement(i, j)) != null ? $t.dispose() : null;
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
         * @this TSS.SharpedJs.Universe
         * @memberof TSS.SharpedJs.Universe
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
         * @this TSS.SharpedJs.Universe
         * @memberof TSS.SharpedJs.Universe
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
         * @this TSS.SharpedJs.Universe
         * @memberof TSS.SharpedJs.Universe
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
         * @this TSS.SharpedJs.Universe
         * @memberof TSS.SharpedJs.Universe
         * @return  {void}
         */
        setDefaultObjectsAccessiblePlace: function () {
            for (var i = 0; i < this.width; i = (i + 1) | 0) {
                for (var j = 0; j < this.height; j = (j + 1) | 0) {
                    this.setFoodCanPlaceAt(i, j, true);
                    this.setPoisonCanPlaceAt(i, j, TSS.SharpedJs.StableRandom.rd.next$2(0, 50) === 1);
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
         * @this TSS.SharpedJs.Universe
         * @memberof TSS.SharpedJs.Universe
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
         * @this TSS.SharpedJs.Universe
         * @memberof TSS.SharpedJs.Universe
         * @param   {boolean}    isAsync
         * @return  {void}
         */
        clearField: function (isAsync) {
            if (isAsync === void 0) { isAsync = true; }
            var act = Bridge.fn.bind(this, $asm.$.TSS.SharpedJs.Universe.f1);
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
         * @this TSS.SharpedJs.Universe
         * @memberof TSS.SharpedJs.Universe
         * @param   {number}     count     
         * @param   {boolean}    isSync
         * @return  {void}
         */
        generateCells: function (count, isSync) {
            if (isSync === void 0) { isSync = true; }

            var act = Bridge.fn.bind(this, function () {
                //List<Cell> bufCellList = new List<Cell>(0);
                for (var i = 0; i < count; i = (i + 1) | 0) {

                    var x = TSS.SharpedJs.StableRandom.rd.next$1(this.width);
                    var y = TSS.SharpedJs.StableRandom.rd.next$1(this.height);
                    var cell = new TSS.SharpedJs.Cell.ctor(this.getConstsUniverseProperty());
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
         * @this TSS.SharpedJs.Universe
         * @memberof TSS.SharpedJs.Universe
         * @param   {boolean}    isAsync
         * @return  {void}
         */
        generateFoodOnAllField: function (isAsync) {
            if (isAsync === void 0) { isAsync = true; }
            this.clearField(isAsync);

            var act = Bridge.fn.bind(this, $asm.$.TSS.SharpedJs.Universe.f2);
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
         * @this TSS.SharpedJs.Universe
         * @memberof TSS.SharpedJs.Universe
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
         * @this TSS.SharpedJs.Universe
         * @memberof TSS.SharpedJs.Universe
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
         * @this TSS.SharpedJs.Universe
         * @memberof TSS.SharpedJs.Universe
         * @param   {number}                          x                 
         * @param   {number}                          y                 
         * @param   {TSS.SharpedJs.UniverseObject}    universeObject
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
         * @this TSS.SharpedJs.Universe
         * @memberof TSS.SharpedJs.Universe
         * @param   {number}                          x                     
         * @param   {number}                          y                     
         * @param   {TSS.SharpedJs.UniverseObject}    universeObject        
         * @param   {boolean}                         canReSetPrevObject
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
         * @this TSS.SharpedJs.Universe
         * @memberof TSS.SharpedJs.Universe
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
                var x = TSS.SharpedJs.StableRandom.rd.next$2(0, this.width);
                var y = TSS.SharpedJs.StableRandom.rd.next$2(0, this.height);
                if (this.getFoodCanPlaceAt(x, y)) {
                    if (this.getObjectDescriptor(x, y) > 100) {
                        try {
                            (Bridge.as(this.getMatrixElement(x, y), TSS.SharpedJs.Cell)).addEnergy(this.getConstsUniverseProperty().energyLevel_DefFood);
                        }
                        catch ($e1) {
                            $e1 = System.Exception.create($e1);
                        }
                    } else {
                        this.addUniverseObject(x, y, new TSS.SharpedJs.Food(this.getConstsUniverseProperty(), TSS.SharpedJs.FoodType.defaultFood), true);
                    }
                }
            }
        },
        generatePoison: function (count) {
            for (var i = 0; i < count; i = (i + 1) | 0) {
                var x = TSS.SharpedJs.StableRandom.rd.next$2(0, this.width);
                var y = TSS.SharpedJs.StableRandom.rd.next$2(0, this.height);
                if (this.getPoisonCanPlaceAt(x, y)) {
                    if (this.getObjectDescriptor(x, y) > 100) {
                        try {
                            (Bridge.as(this.getMatrixElement(x, y), TSS.SharpedJs.Cell)).addEnergy(this.getConstsUniverseProperty().energyLevel_PoisonedFood);
                        }
                        catch ($e1) {
                            $e1 = System.Exception.create($e1);
                        }
                    } else {
                        this.addUniverseObject(x, y, new TSS.SharpedJs.Food(this.getConstsUniverseProperty(), TSS.SharpedJs.FoodType.poison), true);
                    }
                }

            }
        },
        killCell: function (x, y) {
            this.getMatrixElement(x, y).dispose();
            this.addUniverseObject(x, y, new TSS.SharpedJs.Food(this.getConstsUniverseProperty(), TSS.SharpedJs.FoodType.deadCell), true);
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
         * @this TSS.SharpedJs.Universe
         * @memberof TSS.SharpedJs.Universe
         * @param   {TSS.SharpedJs.Cell}    cell
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
                case TSS.SharpedJs.MoveDirection.stand: 
                    return;
                case TSS.SharpedJs.MoveDirection.up: 
                    x2 = x1;
                    y2 = (y1 - 1) | 0;
                    break;
                case TSS.SharpedJs.MoveDirection.down: 
                    x2 = x1;
                    y2 = (y1 + 1) | 0;
                    break;
                case TSS.SharpedJs.MoveDirection.left: 
                    x2 = (x1 - 1) | 0;
                    y2 = y1;
                    break;
                case TSS.SharpedJs.MoveDirection.right: 
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
                    cell.addEnergy((Bridge.as(unObj, TSS.SharpedJs.Food)).getEnergyLevel());
                    this.relocateUniverseObject(x1, y1, x2, y2);
                } else if (cell.getDescriptor() === desc) {
                    //���� ������ - �����������
                    cell.addEnergy(this.getConstsUniverseProperty().energyLevel_MovesFriendly);
                    (Bridge.as(unObj, TSS.SharpedJs.Cell)).addEnergy(this.getConstsUniverseProperty().energyLevel_MovesFriendly);
                } else {
                    var anotherCell = Bridge.as(unObj, TSS.SharpedJs.Cell);
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
         * @this TSS.SharpedJs.Universe
         * @memberof TSS.SharpedJs.Universe
         * @return  {void}
         */
        checkAllCells: function () {
            var cellCountWas = this.getCellsCount();
            var bufCellList = new (System.Collections.Generic.List$1(TSS.SharpedJs.Cell))(0);

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
                    var md = new (System.Collections.Generic.List$1(TSS.SharpedJs.MoveDirection))(0);
                    var x = this.cellList.getItem(i).getX();
                    var y = this.cellList.getItem(i).getY();
                    if (this.validateCords(x, ((y - 1) | 0)) && this.getObjectDescriptor(x, ((y - 1) | 0)) < 100) {
                        md.add(TSS.SharpedJs.MoveDirection.up);
                    }
                    if (this.validateCords(x, ((y + 1) | 0)) && this.getObjectDescriptor(x, ((y + 1) | 0)) < 100) {
                        md.add(TSS.SharpedJs.MoveDirection.down);
                    }
                    if (this.validateCords(((x - 1) | 0), y) && this.getObjectDescriptor(((x - 1) | 0), y) < 100) {
                        md.add(TSS.SharpedJs.MoveDirection.left);
                    }
                    if (this.validateCords(((x + 1) | 0), y) && this.getObjectDescriptor(((x + 1) | 0), y) < 100) {
                        md.add(TSS.SharpedJs.MoveDirection.right);
                    }

                    var choice = TSS.SharpedJs.MoveDirection.stand;
                    if (md.getCount() > 0) {
                        choice = md.getItem(TSS.SharpedJs.StableRandom.rd.next$1(md.getCount()));
                    }

                    if (choice === TSS.SharpedJs.MoveDirection.stand) {
                        continue;
                    }

                    var newCell = this.cellList.getItem(i).createChild(this.getTypesOfCellsCount() < this.getConstsUniverseProperty().maxCountOfCellTypes);

                    switch (choice) {
                        case TSS.SharpedJs.MoveDirection.up: 
                            this.addUniverseObject(x, ((y - 1) | 0), newCell, true);
                            break;
                        case TSS.SharpedJs.MoveDirection.down: 
                            this.addUniverseObject(x, ((y + 1) | 0), newCell, true);
                            break;
                        case TSS.SharpedJs.MoveDirection.left: 
                            this.addUniverseObject(((x - 1) | 0), y, newCell, true);
                            break;
                        case TSS.SharpedJs.MoveDirection.right: 
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
                bufCellList2 = new (System.Collections.Generic.List$1(TSS.SharpedJs.Cell))(0);
                while (bufCellList.getCount() > 0) {
                    var index = TSS.SharpedJs.StableRandom.rd.next$1(bufCellList.getCount());
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
         * @this TSS.SharpedJs.Universe
         * @memberof TSS.SharpedJs.Universe
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
                    if (uo != null && !uo.isDisposed() && Bridge.Reflection.isAssignableFrom(TSS.SharpedJs.IHasEnergy, Bridge.getType(uo))) {
                        sum = sum.add(Bridge.Int.clip64((Bridge.as(uo, TSS.SharpedJs.IHasEnergy)).TSS$SharpedJs$IHasEnergy$getEnergyLevel()));
                    }

                }
            }
            this.totalUniverseEnergy = sum;
        }
    });

    Bridge.ns("TSS.SharpedJs.Universe", $asm.$);

    Bridge.apply($asm.$.TSS.SharpedJs.Universe, {
        f1: function () {
            this.cellList = new (System.Collections.Generic.List$1(TSS.SharpedJs.Cell))();
            this.mostFitGenome_OneCell = null;
            this.universeMatrix = System.Array.create(null, null, TSS.SharpedJs.UniverseObject, this.width, this.height);
            this.setTypesOfCellsCount(0);
        },
        f2: function () {
            for (var i = 0; i < this.width; i = (i + 1) | 0) {
                for (var j = 0; j < this.height; j = (j + 1) | 0) {
                    this.setMatrixElement(i, j, new TSS.SharpedJs.Food(this.getConstsUniverseProperty(), TSS.SharpedJs.FoodType.defaultFood));
                }
            }
        }
    });

    Bridge.define("TSS.SharpedJs.UniverseInfoPresenter", {
        paragraphElement: null,
        ctor: function (paragraphElement) {
            this.$initialize();
            this.paragraphElement = paragraphElement;

        },
        setFontSize: function (fontSize) {
            this.paragraphElement.style.font = System.String.format("bold {0}px Courier New", fontSize);
        },
        writeUniverseInfo: function (universe) {
            var infoStr = System.String.replaceAll(System.String.replaceAll((System.String.concat(this.getUniverseInfoString(universe), "\n&emsp; &emsp;", System.String.replaceAll(this.getCellInfoString(universe.getMostFitCell()), "\n", "\n&emsp;&emsp;"))), "\n", "<br>"), "\t", "&emsp;&emsp;&emsp;&emsp;");
            this.paragraphElement.innerHTML = infoStr;
        },
        getUniverseInfoString: function (universe) {
            var cellsCount = universe.getCellsCount();
            var totalEnergy = universe.getTotalUniverseEnergy();
            var tick = universe.getTicksCount();
            var w = universe.getWidth();
            var h = universe.getHeight();
            var typesOfCellCount = universe.getTypesOfCellsCount();

            var unInfoStr = System.String.format(TSS.SharpedJs.LanguageHandler.getInstance().universeInfoStringFormatter, w, h, cellsCount, totalEnergy, tick, typesOfCellCount);

            return unInfoStr;
        },
        getCellInfoString: function (cell) {
            var $t;
            var desc, hunger, aggression, reproduction, friendly, poisonAddiction, corpseAddiction, cellsCount;
            if ((cell != null ? cell.getGenome() : null) == null) {
                desc = 0;
                hunger = 0;
                aggression = 0;
                reproduction = 0;
                friendly = 0;
                poisonAddiction = 0;
                corpseAddiction = 0;
                cellsCount = -1;
            } else {
                desc = cell.getDescriptor();
                hunger = cell.getGenome().getHunger();
                aggression = cell.getGenome().getAggression();
                reproduction = cell.getGenome().getReproduction();
                friendly = cell.getGenome().getFriendly();
                poisonAddiction = cell.getGenome().getPoisonAddiction();
                corpseAddiction = cell.getGenome().getCorpseAddiction();
                cellsCount = ($t = (cell != null ? cell.getCellsCountWithThisDescriptor() : null), $t != null ? $t : -1); //-V3022
            }

            var cellInfoStr = System.String.format(TSS.SharpedJs.LanguageHandler.getInstance().cellInfoStringFormatter, hunger, aggression, reproduction, friendly, poisonAddiction, corpseAddiction, cellsCount);

            var color = TSS.SharpedJs.GraphicsHelper.cssColorFromInt(desc);
            cellInfoStr = System.String.concat(cellInfoStr, (System.String.format("<span style=\"color:{0}\"> {0}</span>", color)));
            return cellInfoStr;
        }
    });

    Bridge.define("TSS.SharpedJs.UrlParamsManager", {
        statics: {
            getParameter: function (name) {
                return GetUrlParameterValue(name);
            }
        }
    });

    /**
     * Very important class. It is a alive organisms of our game.
     <p />
     ����� ������ �����. ������������ �� ���� ����� ��������� ����� ����.
     *
     * @class TSS.SharpedJs.Cell
     * @augments TSS.SharpedJs.UniverseObject
     * @implements  TSS.SharpedJs.IHasEnergy
     */
    Bridge.define("TSS.SharpedJs.Cell", {
        inherits: [TSS.SharpedJs.UniverseObject,TSS.SharpedJs.IHasEnergy],
        age: 0,
        energyLevel: 0,
        genome: null,
        moveDisperation: 0,
        parentDescriptor: 0,
        cellsWithThisDescriptorCount: null,
        config: {
            alias: [
            "getEnergyLevel", "TSS$SharpedJs$IHasEnergy$getEnergyLevel",
            "dispose", "System$IDisposable$dispose"
            ],
            init: function () {
                this.cellsWithThisDescriptorCount = new TSS.SharpedJs.Cell.LinkedInt();
            }
        },
        ctor: function (constsUniverse) {
            TSS.SharpedJs.Cell.$ctor1.call(this, constsUniverse, new TSS.SharpedJs.Genome.$ctor1(constsUniverse), constsUniverse.energyLevel_CreatingCell, 1);

        },
        $ctor1: function (constsUniverse, genome, energyLevel, descriptor) {
            this.$initialize();
            TSS.SharpedJs.UniverseObject.ctor.call(this, constsUniverse);
            this.genome = genome;
            this.age = 0;
            this.energyLevel = energyLevel;
            if (descriptor < 100) {
                var desc = TSS.SharpedJs.StableRandom.rd.next$2(100, 2147483647);
                this.descriptor = desc;
            } else {
                this.descriptor = descriptor;
            }
            this.parentDescriptor = TSS.SharpedJs.StableRandom.rd.next$2(100, 2147483647);
        },
        /**
         * An important part of the system. Genome - a cell data storage (its behavioral factors). Cells with identical genomes have identical descriptors.
         <p />
         ������ ����� �������. ����� - ��������� ������ � ������(�� ������������� �������). � ������ � ���������� ������� ���������� �����������.
         *
         * @instance
         * @public
         * @this TSS.SharpedJs.Cell
         * @memberof TSS.SharpedJs.Cell
         * @return  {TSS.SharpedJs.Genome}
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
         * @this TSS.SharpedJs.Cell
         * @memberof TSS.SharpedJs.Cell
         * @param   {boolean}               haveMutationChance
         * @return  {TSS.SharpedJs.Cell}
         */
        createChild: function (haveMutationChance) {
            this.age = 0;
            this.energyLevel = Bridge.Int.clip32(this.energyLevel / 2);
            var res;
            if (haveMutationChance && TSS.SharpedJs.StableRandom.rd.next$1(100) < this.getConstsUniverseProperty().mutation_ChancePercent && this.getConstsUniverseProperty().mutation_Enable) {
                res = new TSS.SharpedJs.Cell.$ctor1(this.getConstsUniverseProperty(), this.genome.cloneAndMutate(this.getConstsUniverseProperty().mutation_ChangedValuesAtOne), this.getEnergyLevel(), 1);
                res.parentDescriptor = this.descriptor;
            } else {
                res = new TSS.SharpedJs.Cell.$ctor1(this.getConstsUniverseProperty(), this.genome.clone(), this.getEnergyLevel(), this.descriptor);
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
         * @this TSS.SharpedJs.Cell
         * @memberof TSS.SharpedJs.Cell
         * @param   {TSS.SharpedJs.Universe}    universe
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

            var res = TSS.SharpedJs.MoveDirection.stand;
            if (biggest >= 0) {
                var md = new (System.Collections.Generic.List$1(TSS.SharpedJs.MoveDirection))(0);
                if (biggest === up) {
                    md.add(TSS.SharpedJs.MoveDirection.up);
                }
                if (biggest === down) {
                    md.add(TSS.SharpedJs.MoveDirection.down);
                }
                if (biggest === left) {
                    md.add(TSS.SharpedJs.MoveDirection.left);
                }
                if (biggest === right) {
                    md.add(TSS.SharpedJs.MoveDirection.right);
                }

                res = md.getItem(TSS.SharpedJs.StableRandom.rd.next$1(md.getCount()));
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
         * @this TSS.SharpedJs.Cell
         * @memberof TSS.SharpedJs.Cell
         * @return  {void}
         */
        dispose: function () {
            if (!this.isDisposed()) {
                this.cellsWithThisDescriptorCount.value = (this.cellsWithThisDescriptorCount.value - 1) | 0;
                //cellsWithThisDescriptorCount = null;
            }
            TSS.SharpedJs.UniverseObject.prototype.dispose.call(this);
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
         * @this TSS.SharpedJs.Cell
         * @memberof TSS.SharpedJs.Cell
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

    Bridge.define("TSS.SharpedJs.Food", {
        inherits: [TSS.SharpedJs.UniverseObject,TSS.SharpedJs.IHasEnergy],
        getEnergyLevelDelegate: null,
        config: {
            alias: [
            "getEnergyLevel", "TSS$SharpedJs$IHasEnergy$getEnergyLevel"
            ]
        },
        ctor: function (constsUniverse, foodType) {
            this.$initialize();
            TSS.SharpedJs.UniverseObject.ctor.call(this, constsUniverse);
            //I use delegate to always return value from ConstsUniverse, if it updated.
            if (foodType === TSS.SharpedJs.FoodType.defaultFood) {
                this.descriptor = -1;
                this.getEnergyLevelDelegate = Bridge.fn.bind(this, $asm.$.TSS.SharpedJs.Food.f1);
            } else if (foodType === TSS.SharpedJs.FoodType.deadCell) {
                this.descriptor = -2;
                this.getEnergyLevelDelegate = Bridge.fn.bind(this, $asm.$.TSS.SharpedJs.Food.f2);
            } else if (foodType === TSS.SharpedJs.FoodType.poison) {
                this.descriptor = -3;
                this.getEnergyLevelDelegate = Bridge.fn.bind(this, $asm.$.TSS.SharpedJs.Food.f3);
            }
        },
        getEnergyLevel: function () {
            return this.getEnergyLevelDelegate();
        }
    });

    Bridge.ns("TSS.SharpedJs.Food", $asm.$);

    Bridge.apply($asm.$.TSS.SharpedJs.Food, {
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

    Bridge.define("TSS.SharpedJs.UniverseOutputUIElement", {
        inherits: [TSS.SharpedJs.IUniverseOutputUIElement],
        statics: {
            defInstance: null,
            getDefInstance: function () {
                if (TSS.SharpedJs.UniverseOutputUIElement.defInstance == null) {
                    TSS.SharpedJs.UniverseOutputUIElement.defInstance = new TSS.SharpedJs.UniverseOutputUIElement();
                    TSS.SharpedJs.UniverseOutputUIElement.defInstance.setButtonCreateNewUniverse(document.getElementById("createUniverseButton"));
                    TSS.SharpedJs.UniverseOutputUIElement.defInstance.setButtonStart(document.getElementById("startButton"));
                    TSS.SharpedJs.UniverseOutputUIElement.defInstance.setButtonStop(document.getElementById("stopButton"));
                    TSS.SharpedJs.UniverseOutputUIElement.defInstance.setButtonClearField(document.getElementById("clearFieldButton"));
                    TSS.SharpedJs.UniverseOutputUIElement.defInstance.setButtonGenerateFoodOnAllField(document.getElementById("genFoodButton"));
                    TSS.SharpedJs.UniverseOutputUIElement.defInstance.setButtonGenerateCells(document.getElementById("genCellsButton"));
                    TSS.SharpedJs.UniverseOutputUIElement.defInstance.setButtonСonstsUniverseRedactor(document.getElementById("сonstsUnRedactorOpen"));
                    TSS.SharpedJs.UniverseOutputUIElement.defInstance.setTextBoxCellsCount(Bridge.as(document.getElementById("genCellsCountTextBox"), HTMLInputElement));
                    TSS.SharpedJs.UniverseOutputUIElement.defInstance.setCanvas(Bridge.as(document.getElementById("universeCanvas"), HTMLCanvasElement));
                    TSS.SharpedJs.UniverseOutputUIElement.defInstance.setUniverseInfoParagraph(Bridge.as(document.getElementById("universeInfoParagraph"), HTMLParagraphElement));
                    TSS.SharpedJs.UniverseOutputUIElement.defInstance.setRangeElementTimeout(Bridge.as(document.getElementById("timeoutSlider"), HTMLInputElement));
                    TSS.SharpedJs.UniverseOutputUIElement.defInstance.setTimeoutSpan(Bridge.as(document.getElementById("timeoutSpanId"), HTMLSpanElement));
                }
                return TSS.SharpedJs.UniverseOutputUIElement.defInstance;
            }
        },
        config: {
            properties: {
                ButtonCreateNewUniverse: null,
                ButtonStart: null,
                ButtonStop: null,
                ButtonClearField: null,
                ButtonGenerateFoodOnAllField: null,
                ButtonGenerateCells: null,
                "ButtonСonstsUniverseRedactor": null,
                TextBoxCellsCount: null,
                Canvas: null,
                UniverseInfoParagraph: null,
                RangeElementTimeout: null,
                TimeoutSpan: null
            },
            alias: [
            "getButtonCreateNewUniverse", "TSS$SharpedJs$IUniverseOutputUIElement$getButtonCreateNewUniverse",
            "setButtonCreateNewUniverse", "TSS$SharpedJs$IUniverseOutputUIElement$setButtonCreateNewUniverse",
            "getButtonStart", "TSS$SharpedJs$IUniverseOutputUIElement$getButtonStart",
            "setButtonStart", "TSS$SharpedJs$IUniverseOutputUIElement$setButtonStart",
            "getButtonStop", "TSS$SharpedJs$IUniverseOutputUIElement$getButtonStop",
            "setButtonStop", "TSS$SharpedJs$IUniverseOutputUIElement$setButtonStop",
            "getButtonClearField", "TSS$SharpedJs$IUniverseOutputUIElement$getButtonClearField",
            "setButtonClearField", "TSS$SharpedJs$IUniverseOutputUIElement$setButtonClearField",
            "getButtonGenerateFoodOnAllField", "TSS$SharpedJs$IUniverseOutputUIElement$getButtonGenerateFoodOnAllField",
            "setButtonGenerateFoodOnAllField", "TSS$SharpedJs$IUniverseOutputUIElement$setButtonGenerateFoodOnAllField",
            "getButtonGenerateCells", "TSS$SharpedJs$IUniverseOutputUIElement$getButtonGenerateCells",
            "setButtonGenerateCells", "TSS$SharpedJs$IUniverseOutputUIElement$setButtonGenerateCells",
            "getButtonСonstsUniverseRedactor", "TSS$SharpedJs$IUniverseOutputUIElement$getButtonСonstsUniverseRedactor",
            "setButtonСonstsUniverseRedactor", "TSS$SharpedJs$IUniverseOutputUIElement$setButtonСonstsUniverseRedactor",
            "getTextBoxCellsCount", "TSS$SharpedJs$IUniverseOutputUIElement$getTextBoxCellsCount",
            "setTextBoxCellsCount", "TSS$SharpedJs$IUniverseOutputUIElement$setTextBoxCellsCount",
            "getCanvas", "TSS$SharpedJs$IUniverseOutputUIElement$getCanvas",
            "setCanvas", "TSS$SharpedJs$IUniverseOutputUIElement$setCanvas",
            "getUniverseInfoParagraph", "TSS$SharpedJs$IUniverseOutputUIElement$getUniverseInfoParagraph",
            "setUniverseInfoParagraph", "TSS$SharpedJs$IUniverseOutputUIElement$setUniverseInfoParagraph",
            "getRangeElementTimeout", "TSS$SharpedJs$IUniverseOutputUIElement$getRangeElementTimeout",
            "setRangeElementTimeout", "TSS$SharpedJs$IUniverseOutputUIElement$setRangeElementTimeout",
            "getTimeoutSpan", "TSS$SharpedJs$IUniverseOutputUIElement$getTimeoutSpan",
            "setTimeoutSpan", "TSS$SharpedJs$IUniverseOutputUIElement$setTimeoutSpan"
            ]
        }
    });

    var $m = Bridge.setMetadata,
        $n = [System,TSS.SharpedJs];
    $m($n[1].ConstsUniverse, function () { return {"m":[{"at":[new TSS.SharpedJs.NumericValuesAttribute.ctor(-2147483648.0, 2147483647.0)],"a":2,"n":"CellAge_AdultCell","t":4,"rt":$n[0].Int32,"sn":"cellAge_AdultCell"},{"at":[new TSS.SharpedJs.NumericValuesAttribute.ctor(-2147483648.0, 2147483647.0)],"a":2,"n":"CellAge_Max","t":4,"rt":$n[0].Int32,"sn":"cellAge_Max"},{"at":[new TSS.SharpedJs.NoInfoAttribute()],"a":1,"n":"CellGenome_AggressionRange","t":4,"rt":$n[1].MinMaxInt,"sn":"cellGenome_AggressionRange"},{"at":[new TSS.SharpedJs.NumericValuesAttribute.ctor(-2147483648.0, 2147483647.0)],"a":2,"n":"CellGenome_Child_Aggression","t":4,"rt":$n[0].Int32,"sn":"cellGenome_Child_Aggression"},{"at":[new TSS.SharpedJs.NoInfoAttribute()],"a":1,"n":"CellGenome_CorpseRange","t":4,"rt":$n[1].MinMaxInt,"sn":"cellGenome_CorpseRange"},{"at":[new TSS.SharpedJs.NoInfoAttribute()],"a":1,"n":"CellGenome_FriendlyRange","t":4,"rt":$n[1].MinMaxInt,"sn":"cellGenome_FriendlyRange"},{"at":[new TSS.SharpedJs.NoInfoAttribute()],"a":1,"n":"CellGenome_HungerRange","t":4,"rt":$n[1].MinMaxInt,"sn":"cellGenome_HungerRange"},{"at":[new TSS.SharpedJs.NoInfoAttribute()],"a":1,"n":"CellGenome_PoisonRange","t":4,"rt":$n[1].MinMaxInt,"sn":"cellGenome_PoisonRange"},{"at":[new TSS.SharpedJs.NoInfoAttribute()],"a":1,"n":"CellGenome_ReproductionRange","t":4,"rt":$n[1].MinMaxInt,"sn":"cellGenome_ReproductionRange"},{"at":[new TSS.SharpedJs.NumericValuesAttribute.ctor(-2147483648.0, 2147483647.0)],"a":2,"n":"CellsCount_MaxAtField","t":4,"rt":$n[0].Int32,"sn":"cellsCount_MaxAtField"},{"at":[new TSS.SharpedJs.NumericValuesAttribute.ctor(-2147483648.0, 2147483647.0)],"a":2,"n":"CellsCount_MaxWithOneType","t":4,"rt":$n[0].Int32,"sn":"cellsCount_MaxWithOneType"},{"at":[new TSS.SharpedJs.NumericValuesAttribute.ctor(-99999.0, 99999.0)],"a":2,"n":"EnergyEntropyPerSecond","t":4,"rt":$n[0].Single,"sn":"energyEntropyPerSecond"},{"at":[new TSS.SharpedJs.NumericValuesAttribute.ctor(-3.4028234663852886E+38, 3.4028234663852886E+38)],"a":2,"n":"EnergyLevel_CreatingCell","t":4,"rt":$n[0].Single,"sn":"energyLevel_CreatingCell"},{"at":[new TSS.SharpedJs.NumericValuesAttribute.ctor(-3.4028234663852886E+38, 3.4028234663852886E+38)],"a":2,"n":"EnergyLevel_DeadCell","t":4,"rt":$n[0].Single,"sn":"energyLevel_DeadCell"},{"at":[new TSS.SharpedJs.NumericValuesAttribute.ctor(-3.4028234663852886E+38, 3.4028234663852886E+38)],"a":2,"n":"EnergyLevel_DefFood","t":4,"rt":$n[0].Single,"sn":"energyLevel_DefFood"},{"at":[new TSS.SharpedJs.NumericValuesAttribute.ctor(-3.4028234663852886E+38, 3.4028234663852886E+38)],"a":2,"n":"EnergyLevel_MaxForCell","t":4,"rt":$n[0].Single,"sn":"energyLevel_MaxForCell"},{"at":[new TSS.SharpedJs.NumericValuesAttribute.ctor(-3.4028234663852886E+38, 3.4028234663852886E+38)],"a":2,"n":"EnergyLevel_MovesAggression","t":4,"rt":$n[0].Single,"sn":"energyLevel_MovesAggression"},{"at":[new TSS.SharpedJs.NumericValuesAttribute.ctor(-3.4028234663852886E+38, 3.4028234663852886E+38)],"a":2,"n":"EnergyLevel_MovesFriendly","t":4,"rt":$n[0].Single,"sn":"energyLevel_MovesFriendly"},{"at":[new TSS.SharpedJs.NumericValuesAttribute.ctor(-3.4028234663852886E+38, 3.4028234663852886E+38)],"a":2,"n":"EnergyLevel_NeededForReproduction","t":4,"rt":$n[0].Single,"sn":"energyLevel_NeededForReproduction"},{"at":[new TSS.SharpedJs.NumericValuesAttribute.ctor(-3.4028234663852886E+38, 3.4028234663852886E+38)],"a":2,"n":"EnergyLevel_PoisonedFood","t":4,"rt":$n[0].Single,"sn":"energyLevel_PoisonedFood"},{"at":[new TSS.SharpedJs.NoInfoAttribute()],"a":2,"n":"MaxCountOfCellTypes","t":4,"rt":$n[0].Int32,"sn":"maxCountOfCellTypes"},{"at":[new TSS.SharpedJs.NoInfoAttribute()],"a":2,"n":"Mutation_AttackChildrenMutantsOfFirstGeneration","t":4,"rt":Boolean,"sn":"mutation_AttackChildrenMutantsOfFirstGeneration"},{"at":[new TSS.SharpedJs.NoInfoAttribute()],"a":2,"n":"Mutation_AttackParentIfCellIsYouMutant","t":4,"rt":Boolean,"sn":"mutation_AttackParentIfCellIsYouMutant"},{"at":[new TSS.SharpedJs.NumericValuesAttribute.$ctor1(0.0, 100.0, 1)],"a":2,"n":"Mutation_ChancePercent","t":4,"rt":$n[0].Int32,"sn":"mutation_ChancePercent"},{"at":[new TSS.SharpedJs.NumericValuesAttribute.ctor(1.0, 200.0)],"a":2,"n":"Mutation_ChangedValuesAtOne","t":4,"rt":$n[0].Int32,"sn":"mutation_ChangedValuesAtOne"},{"at":[new TSS.SharpedJs.NoInfoAttribute()],"a":2,"n":"Mutation_Enable","t":4,"rt":Boolean,"sn":"mutation_Enable"},{"at":[new TSS.SharpedJs.NumericValuesAttribute.ctor(0.0, 30000.0)],"a":2,"n":"Special_FoodCountForTick","t":4,"rt":$n[0].Int32,"sn":"special_FoodCountForTick"},{"at":[new TSS.SharpedJs.NumericValuesAttribute.ctor(0.0, 30000.0)],"a":2,"n":"Special_PoisonCountForTick","t":4,"rt":$n[0].Int32,"sn":"special_PoisonCountForTick"}]}; });
    $m($n[1].MinMaxInt, function () { return {"at":[new TSS.SharpedJs.ParsebleAttribute()],"m":[{"at":[new TSS.SharpedJs.NoInfoAttribute()],"a":2,"n":"Parse","is":true,"t":8,"pi":[{"n":"str","pt":String,"ps":0}],"sn":"parse","rt":$n[1].MinMaxInt,"p":[String]}]}; });
});
