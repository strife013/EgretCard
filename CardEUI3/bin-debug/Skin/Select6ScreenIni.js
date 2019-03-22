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
    var Select6ScreenIni = (function (_super) {
        __extends(Select6ScreenIni, _super);
        function Select6ScreenIni() {
            var _this = _super.call(this) || this;
            _this.skinName = "src/Skin/select6ScreenTypeSkin.exml";
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.toShuffle, _this);
            _this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.to3screen, _this);
            return _this;
        }
        Select6ScreenIni.prototype.toShuffle = function () {
            //重置
            //resetShuffle
            Data.currentMainIndex = 2;
            game.AppFacade.getInstance().sendNotification("toshuffle");
        };
        Select6ScreenIni.prototype.to3screen = function () {
            game.AppFacade.getInstance().sendNotification("to3");
        };
        Select6ScreenIni.prototype.to4screen = function () {
            game.AppFacade.getInstance().sendNotification("to4");
        };
        Select6ScreenIni.prototype.createCompleteEvent = function (event) {
            this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.To3Screen, this);
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            // game.AppFacade.getInstance().registerMediator( new RoleMediator(this) );
        };
        Select6ScreenIni.prototype.To3Screen = function (event) {
            game.AppFacade.getInstance().sendNotification("to3");
        };
        Select6ScreenIni.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        return Select6ScreenIni;
    }(eui.Component));
    game.Select6ScreenIni = Select6ScreenIni;
    __reflect(Select6ScreenIni.prototype, "game.Select6ScreenIni");
})(game || (game = {}));
//# sourceMappingURL=Select6ScreenIni.js.map