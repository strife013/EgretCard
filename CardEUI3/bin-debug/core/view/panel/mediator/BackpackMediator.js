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
  * screenType show mediator
  */
var game;
(function (game) {
    var BackpackMediator = (function (_super) {
        __extends(BackpackMediator, _super);
        function BackpackMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, BackpackMediator.NAME, viewComponent) || this;
            _this.type3screenCard = new game.Select3ScreenIni();
            _this.type4screenCard = new game.SelectScreenIni();
            _this.type6screenCard = new game.Select6ScreenIni();
            _this.shuffleScreen = new GameShuffle();
            _this.PickCard = new game.PickCard();
            return _this;
        }
        BackpackMediator.prototype.listNotificationInterests = function () {
            return [
                "to3", "to4", "to6", "toshuffle", "topickcard", "toShowCards"
            ];
        };
        BackpackMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case "toShowCards":
                    break;
                case "topickcard":
                    this.shuffleScreen.pickCards();
                    break;
                case "toshuffle": {
                    //显示
                    this.closePanel(0);
                    this.shuffleScreen.resetShuffle();
                    this.showUI(this.shuffleScreen, false, 0, 0, 2);
                    break;
                }
                case "to3": {
                    //显示
                    this.closePanel(0);
                    this.shuffleScreen.resetShuffle();
                    this.showUI(this.type3screenCard, false, 0, 0, 4);
                    break;
                }
                case "to4": {
                    //显示角色面板
                    this.closePanel(0);
                    this.shuffleScreen.resetShuffle();
                    this.showUI(this.type4screenCard, false, 0, 0, 3);
                    break;
                }
                case "to6": {
                    //显示角色面板
                    this.closePanel(0);
                    this.shuffleScreen.resetShuffle();
                    this.showUI(this.type6screenCard, false, 0, 0, 4);
                    break;
                }
                case PanelNotify.CLOSE_BACKPACK: {
                    this.closePanel(1);
                    break;
                }
            }
        };
        /**
         * 初始化面板ui
         */
        BackpackMediator.prototype.initUI = function () {
            // this.type4screenCard.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.to3screen,this);
            //this.type4screenCard.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP,this.to3screen,this);
            //this.type3screenCard.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP,this.to4screen,this);
            //  this.backpackPanel.saveProxy.addEventListener(egret.TouchEvent.TOUCH_TAP,this.saveProxyButtonClick,this);
        };
        return BackpackMediator;
    }(BaseMediator));
    BackpackMediator.NAME = "BackpackMediator";
    game.BackpackMediator = BackpackMediator;
    __reflect(BackpackMediator.prototype, "game.BackpackMediator");
})(game || (game = {}));
//# sourceMappingURL=BackpackMediator.js.map