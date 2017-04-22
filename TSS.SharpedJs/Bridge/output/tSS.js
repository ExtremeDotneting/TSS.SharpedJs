Bridge.assembly("TSS.SharpedJs", function ($asm, globals) {
    "use strict";

    Bridge.define("TSS.App", {
        $main: function () {
            window.alert("4");
            var game = new TSS.Game();
            game.tick();

        }
    });

    Bridge.define("TSS.Game", {
        un: null,
        drawUn: null,
        ctor: function () {
            this.$initialize();
            var universeWidth = 15, universeHeight = 15;
            var canvasWidth = 400;
            this.un = new TSS.UniverseLogic.Universe(15, 15);
            window.alert("5");
            var canvasEl = document.createElement('canvas');
            document.body.appendChild(canvasEl);
            window.alert("2");
            this.drawUn = new TSS.SharpedJs.DrawerUniverse(canvasEl, universeWidth, universeHeight, canvasWidth);
            this.un.generateCells(20);
            window.alert("3");
        },
        tick: function () {
            window.alert("1");
            this.un.doUniverseTick();
            this.drawUn.drawFrame(this.un.getAllDescriptors());
            Bridge.sleep(400);
            window.requestAnimationFrame(Bridge.fn.cacheBind(this, this.tick));
        }
    });
});
