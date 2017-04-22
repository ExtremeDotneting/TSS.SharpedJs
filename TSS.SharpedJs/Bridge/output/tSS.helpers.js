Bridge.assembly("TSS.SharpedJs", function ($asm, globals) {
    "use strict";

    /** @namespace TSS.Helpers */

    /**
     * Quite an interesting class. IFormattable makes it clear that it is converted to a string.
     But to reverse the action I had to do Parseble attribute that makes it clear for ValuesRedactor,
     that this type has a method "public static MinMaxInt Parse(string str)".
     <p />
     Довольно интересный класс. IFormattable дает понять, что он конвертируется в строку.
     Но вот для обратного действия мне пришлось сделать атрибут Parseble, который дает понять ValuesRedactor,
     что этот тип имеет метод "public static MinMaxInt Parse(string str)".
     *
     * @class TSS.Helpers.MinMaxInt
     * @implements  System.IFormattable
     */
    Bridge.define("TSS.Helpers.MinMaxInt", {
        inherits: [System.IFormattable],
        statics: {
            parse: function (str) {
                try {
                    var arr = str.split(String.fromCharCode(47));
                    var res = new TSS.Helpers.MinMaxInt.ctor();
                    res.min = System.Convert.toInt32(arr[0]);
                    res.max = System.Convert.toInt32(arr[1]);
                    return res;
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                    //I don`t now why, but program doesn`t throw this exception here.
                    //throw new Exception("Can`t parse to MinMaxInt!");
                    return null;
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

    /**
     * Gives to ValuesRedactor an idea of how to display the class fields.
     <p />
     Дает ValuesRedactor представление о том, как отображать поле класса.
     *
     * @class TSS.Helpers.NumericValuesAttribute
     * @augments System.Attribute
     */
    Bridge.define("TSS.Helpers.NumericValuesAttribute", {
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

    Bridge.define("TSS.Helpers.NumericValuesWayToShow", {
        $kind: "enum",
        statics: {
            Default: 0,
            Spliter: 1
        }
    });

    /**
     * Attribute makes it clear for ValuesRedactor that this type has a method "public static T Parse (string str)", where T - the type of current object.
     With this attribute, you can create your own attributes, working in ValuesRedactor.
     <p />
     Атрибут дает понять ValuesRedactor что этот тип имеет метод "public static T Parse(string str)", где T - данный тип.
     С этим атрибутом вы можете создавать свои атрибуты, работающие в ValuesRedactor.
     *
     * @class TSS.Helpers.ParsebleAttribute
     * @augments System.Attribute
     */
    Bridge.define("TSS.Helpers.ParsebleAttribute", {
        inherits: [System.Attribute],
        statics: {
            parse: function (str, typeToConvert) {
                var parseMethod = Bridge.Reflection.getMembers(typeToConvert, 8, 24 | 256, "Parse");
                if (parseMethod == null || !Bridge.Reflection.isAssignableFrom(typeToConvert, parseMethod.rt)) {
                    throw new TSS.Helpers.ParsebleException.ctor();
                }
                return Bridge.Reflection.midel(parseMethod, null).apply(null, System.Array.init([str], Object));
            }
        }
    });

    Bridge.define("TSS.Helpers.ParsebleException", {
        inherits: [System.Exception],
        ctor: function () {
            TSS.Helpers.ParsebleException.$ctor1.call(this, "Parseble must have a public static method \"Parse\" which get string and create from it new object with this type(Parseble type)!");

        },
        $ctor1: function (msg) {
            this.$initialize();
            System.Exception.ctor.call(this, msg);

        }
    });
});
