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
    var TypeSelect = (function (_super) {
        __extends(TypeSelect, _super);
        function TypeSelect() {
            var _this = _super.call(this) || this;
            _this.skinName = "src/Skin/typeSelectSkin.exml";
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.btnqt.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.toqt, _this);
            _this.btnsy.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.tosy, _this);
            _this.btnaq.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.toaq, _this);
            return _this;
            // this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP,this.to3screen,this);
        }
        TypeSelect.prototype.tosy = function () {
            game.AppFacade.getInstance().sendNotification("to4");
        };
        TypeSelect.prototype.toaq = function () {
            game.AppFacade.getInstance().sendNotification("to4");
        };
        TypeSelect.prototype.toqt = function () {
            game.AppFacade.getInstance().sendNotification("to4");
        };
        TypeSelect.prototype.createCompleteEvent = function (event) {
        };
        TypeSelect.prototype.To3Screen = function (event) {
        };
        TypeSelect.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        return TypeSelect;
    }(eui.Component));
    game.TypeSelect = TypeSelect;
    __reflect(TypeSelect.prototype, "game.TypeSelect");
})(game || (game = {}));
//# sourceMappingURL=TypeSelect.js.map