var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
  * 背包面板
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  */
var game;
(function (game) {
    var myCardMediator = (function (_super) {
        __extends(myCardMediator, _super);
        function myCardMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, myCardMediator.NAME, viewComponent) || this;
            _this.myCardSkin = new game.myCardSkin();
            return _this;
        }
        myCardMediator.prototype.listNotificationInterests = function () {
            return [
                "tocard"
            ];
        };
        myCardMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case "tocard": {
                    //显示角色面板
                    var bodyData = notification.getBody();
                    var curdata = Data.cardsDesc.filter(function (item) { return item.cardname == bodyData; });
                    console.log("tocard", bodyData, "cc", curdata);
                    this.myCardSkin.setData(curdata[0]);
                    this.showUI(this.myCardSkin, false, 0, 0, 5);
                    break;
                }
                case PanelNotify.CLOSE_MAP: {
                    //this.closePanel(1);
                    break;
                }
            }
        };
        /**
         * 初始化面板ui
         */
        myCardMediator.prototype.initUI = function () {
            this.myCardSkin.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeButtonClick, this);
            //            this.mapPanel.readExcel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.readExcelButtonClick,this);
            //this.mapPanel.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn1Click,this);
            //this.mapPanel.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn2Click,this);
            //this.mapPanel.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn3Click,this);
            //this.mapPanel.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn4Click,this);
            // this.mapPanel.btn5.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn5Click,this);
            //this.mapPanel.btn6.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn6Click,this);
            //TipsManager.addTips(this.mapPanel.img1,"没有动画tips！",0);
            // TipsManager.addTips(this.mapPanel.img2,"从下到上渐现",1);
            //TipsManager.addTips(this.mapPanel.img3,"从左向右",2);
            //TipsManager.addTips(this.mapPanel.img4,"从右向左",3);  
        };
        myCardMediator.prototype.btn1Click = function (event) {
            EffectUtils.showTips("从下到上弹出", 1);
        };
        myCardMediator.prototype.btn2Click = function (event) {
            EffectUtils.showTips("从左至右弹出", 2);
        };
        myCardMediator.prototype.btn3Click = function (event) {
            EffectUtils.showTips("从右至左弹出", 3);
        };
        myCardMediator.prototype.btn4Click = function (event) {
            EffectUtils.showTips("从中间弹出渐渐消失", 4);
        };
        myCardMediator.prototype.btn5Click = function (event) {
            EffectUtils.showTips("从大变小", 5);
        };
        myCardMediator.prototype.btn6Click = function (event) {
            EffectUtils.showTips("警告字体颜色", 5, true);
        };
        /**
         * 初始化面板数据
         */
        myCardMediator.prototype.initData = function () {
        };
        myCardMediator.prototype.readExcelButtonClick = function (event) {
        };
        myCardMediator.prototype.closeButtonClick = function (event) {
            this.closePanel(1);
        };
        return myCardMediator;
    }(BaseMediator));
    myCardMediator.NAME = "myCardMediator";
    game.myCardMediator = myCardMediator;
    __reflect(myCardMediator.prototype, "game.myCardMediator");
})(game || (game = {}));
//# sourceMappingURL=myCardMediator.js.map