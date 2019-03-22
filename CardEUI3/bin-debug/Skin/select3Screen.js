var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var Select3ScreenIni = (function (_super) {
        __extends(Select3ScreenIni, _super);
        function Select3ScreenIni() {
            var _this = _super.call(this) || this;
            _this.skinName = "src/Skin/select3ScreenTypeSkin.exml";
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.To4Screen, _this);
            _this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.To6Screen, _this);
            _this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.toShuffle, _this);
            return _this;
        }
        Select3ScreenIni.prototype.toShuffle = function () {
            //重置
            //resetShuffle
            Data.currentMainIndex = 0;
            game.AppFacade.getInstance().sendNotification("toshuffle");
        };
        Select3ScreenIni.prototype.createCompleteEvent = function (event) {
            // this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP,this.To4Screen,this);
            // this.removeEventListener(eui.UIEvent.COMPLETE,this.createCompleteEvent,this);
            // game.AppFacade.getInstance().registerMediator( new RoleMediator(this) );
        };
        Select3ScreenIni.prototype.To4Screen = function (event) {
            game.AppFacade.getInstance().sendNotification("to4");
        };
        Select3ScreenIni.prototype.To6Screen = function (event) {
            game.AppFacade.getInstance().sendNotification("to6");
        };
        Select3ScreenIni.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        return Select3ScreenIni;
    }(eui.Component));
    game.Select3ScreenIni = Select3ScreenIni;
    __reflect(Select3ScreenIni.prototype, "game.Select3ScreenIni");
})(game || (game = {}));
//# sourceMappingURL=select3Screen.js.map