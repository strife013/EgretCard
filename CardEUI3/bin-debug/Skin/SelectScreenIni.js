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
    var SelectScreenIni = (function (_super) {
        __extends(SelectScreenIni, _super);
        function SelectScreenIni() {
            var _this = _super.call(this) || this;
            _this.skinName = "src/Skin/select4ScreenTypeSkin.exml";
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.toShuffle, _this);
            _this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.to3screen, _this);
            return _this;
        }
        SelectScreenIni.prototype.toShuffle = function () {
            //重置
            //resetShuffle
            Data.currentMainIndex = 1;
            game.AppFacade.getInstance().sendNotification("toshuffle");
        };
        SelectScreenIni.prototype.to3screen = function () {
            game.AppFacade.getInstance().sendNotification("to3");
        };
        SelectScreenIni.prototype.to4screen = function () {
            game.AppFacade.getInstance().sendNotification("to4");
        };
        SelectScreenIni.prototype.createCompleteEvent = function (event) {
            this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.To3Screen, this);
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            // game.AppFacade.getInstance().registerMediator( new RoleMediator(this) );
        };
        SelectScreenIni.prototype.To3Screen = function (event) {
            game.AppFacade.getInstance().sendNotification("to3");
        };
        SelectScreenIni.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        return SelectScreenIni;
    }(eui.Component));
    game.SelectScreenIni = SelectScreenIni;
    __reflect(SelectScreenIni.prototype, "game.SelectScreenIni");
})(game || (game = {}));
//# sourceMappingURL=SelectScreenIni.js.map