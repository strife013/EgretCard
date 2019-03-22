var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TypePicker = (function (_super) {
    __extends(TypePicker, _super);
    function TypePicker() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    //开启监听
    TypePicker.prototype.start = function () {
        //this.startBtn.touchEnabled = true;
        //this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabaq,this);
    };
    //初始化
    TypePicker.prototype.init = function () {
        //var aqEvent = new egret.Event(egret.TouchEvent.TOUCH_TAP, false, false);
        //aqEvent.data = this.aq.name;
        this.bg = new egret.Bitmap(RES.getRes('base_png'));
        this.addChild(this.bg);
        this.aq = new egret.Bitmap(RES.getRes('aq_png'));
        this.aq.touchEnabled = true;
        this.aq.name = "aq";
        this.aq.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabaq, this, false);
        this.aq.x = 100;
        this.aq.y = 100;
        this.addChild(this.aq);
        this.sy = new egret.Bitmap(RES.getRes('sy_png'));
        this.sy.touchEnabled = true;
        this.sy.name = "sy";
        this.sy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabsy, this, false);
        this.sy.x = 100;
        this.sy.y = 200;
        this.addChild(this.sy);
        this.qt = new egret.Bitmap(RES.getRes('qt_png'));
        this.qt.touchEnabled = true;
        this.qt.name = "aq";
        this.qt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabqt, this, false);
        this.qt.x = 100;
        this.qt.y = 300;
        this.addChild(this.qt);
    };
    TypePicker.prototype.onTouchTabqt = function (e) {
        this.dispatchSceneTouchEvent("qt");
    };
    TypePicker.prototype.onTouchTabaq = function (e) {
        this.dispatchSceneTouchEvent("aq");
    };
    TypePicker.prototype.onTouchTabsy = function (e) {
        this.dispatchSceneTouchEvent("sy");
    };
    TypePicker.prototype.dispatchSceneTouchEvent = function (obj) {
        var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.changeSceneEvent);
        changeEvent.eventType = Data.startPlayingPanel;
        changeEvent.obj = obj;
        ViewManager.getInstance().dispatchEvent(changeEvent);
    };
    //结束界面，释放监听
    TypePicker.prototype.end = function () {
        this.startBtn.touchEnabled = false;
        if (this.aq.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.aq.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabaq, this);
        }
        if (this.sy.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.sy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabsy, this);
        }
        if (this.qt.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.qt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabqt, this);
        }
    };
    return TypePicker;
}(egret.Sprite));
__reflect(TypePicker.prototype, "TypePicker");
//# sourceMappingURL=TypePicker.js.map