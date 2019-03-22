var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GamePlayingPanel = (function (_super) {
    __extends(GamePlayingPanel, _super);
    function GamePlayingPanel() {
        var _this = _super.call(this) || this;
        _this.startBtn = new egret.TextField();
        _this.handShuffleBtn = new egret.TextField();
        _this.handShuffleBtn.x = Data.stage.width - 100;
        //this.toTypePickerBtn = new egret.TextField();
        //this.toTypePickerBtn.y =  Data.stage.height - 50;
        _this.cardListOrder = new Array();
        _this.backBtn = new egret.Bitmap();
        _this.backBtn.texture = RES.getRes("arrow@3x_png");
        return _this;
        //this.cardList = new Array<card>();
    }
    //开启监听
    //shadowpos
    GamePlayingPanel.prototype.start = function (shadowpos, title) {
        this.init(shadowpos, title);
    };
    //自动洗牌
    GamePlayingPanel.prototype.autoShuffle = function () {
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveManualShuffle, this);
        var cardorder = CollisionUtils.getRandomCardIndex(Data.CardNames.length);
        var self = this;
        this.cardList.forEach(function (v, i) {
            v.ToBack();
            v.rotationCard(cardorder[i]);
            //console.log("indexorder:", cardorder[i], v.indexorder);
            self.setChildIndex(v, v.indexorder + 10);
        });
        this.cardList.sort(function (v, i) {
            return v.indexorder - i.indexorder;
        });
        this.cardList.forEach(function (v, i) {
            console.log("indexorder2:", cardorder[i], v.indexorder);
            self.setChildIndex(v, v.indexorder + 10);
        });
    };
    //手动洗牌
    GamePlayingPanel.prototype.manualShuffle = function () {
        var cardorder = CollisionUtils.getRandomCardIndex(Data.CardNames.length);
        //移除鼠标移动事件，监听鼠标移动事件
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveManualShuffle, this);
        //egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, Data.CurCard.endmove, this);
        var self = this;
        this.cardList.forEach(function (v, i) {
            v.ToBack();
            v.toFixPosition();
            //v.rotationCard(cardorder[i]);
            self.setChildIndex(v, cardorder[i] + 10);
        });
        //shadow初始化 
    };
    GamePlayingPanel.prototype.moveManualShuffle = function (e) {
        var epoint = new egret.Point(e.stageX, e.stageY);
        this.cardList.forEach(function (v, i) {
            //删除鼠标点击事件？
            v.rotationCardByPoint(epoint);
        });
    };
    GamePlayingPanel.prototype.toTypePickerView = function () {
        var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.changeSceneEvent);
        changeEvent.eventType = Data.typePicker;
        changeEvent.obj = this;
        ViewManager.getInstance().dispatchEvent(changeEvent);
    };
    //初始化
    //初始化card position  [{ x: 60, y: 500 }, { x: 300, y: 500 }, { x: 160, y: 300 }]
    GamePlayingPanel.prototype.init = function (cardShadowPos, title) {
        //清空
        this.cardList = new Array();
        Data.CardShadows = new Array();
        //   egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,Data.CurCard.move,this);
        //egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END,Data.CurCard.endmove,this);
        this.startBtn.text = "自动洗牌/洗牌结束";
        this.startBtn.touchEnabled = true;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.autoShuffle, this);
        this.addChild(this.startBtn);
        this.backBtn.touchEnabled = true;
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toTypePickerView, this);
        this.addChild(this.backBtn);
        this.handShuffleBtn.text = "手动洗牌";
        this.handShuffleBtn.touchEnabled = true;
        this.handShuffleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.manualShuffle, this);
        this.addChild(this.handShuffleBtn);
        var stageW = Data.stage.stageWidth;
        var stageH = Data.stage.stageHeight;
        var cardorder = CollisionUtils.getRandomCardIndex(Data.CardNames.length);
        for (var i = 0; i < Data.CardNames.length; i++) {
            var fm = new card(Data.CardNames[i], i);
            //  fm.rotationCard(cardorder[i]);
            var placeX = fm.anchorOffsetX * fm.scaleX + Data.stage.stageWidth / 2 - 30;
            var placeY = fm.indexorder * 2 + Data.stage.stageHeight * 1 / 5;
            fm.scaleX = 0.5;
            fm.scaleY = 0.5;
            fm.x = placeX;
            fm.y = placeY;
            this.cardList.push(fm);
            this.addChildAt(fm, cardorder[i]);
        }
        var self = this;
        this.cardList.sort(function (v, i) {
            return v.indexorder - i.indexorder;
        });
        this.cardList.forEach(function (v, i) {
            console.log("indexorder2:", cardorder[i], v.indexorder);
            self.setChildIndex(v, v.indexorder + 10);
        });
        //for (var i = 0; i < Data.CardNames.length; i++) {
        //    this.setChildIndex(this.cardList[i], cardorder[i]);
        //}
        //var cardShadowPos = [{ x: 60, y: 500 }, { x: 300, y: 500 }, { x: 160, y: 300 }]; 
        ////设置放置位置
        //for (var i = 0; i < cardShadowPos.length; i++) {
        //    var cshadow: cardShadow = new cardShadow("card" + i);
        //    cshadow.x = cardShadowPos[i].x;
        //    cshadow.y = cardShadowPos[i].y;
        //    this.addChildAt(cshadow, 0);
        //    Data.CardShadows.push(cshadow);
        //}
    };
    //private onTouchaq(e: egret.TouchEvent) {
    //    //e.
    //    this.dispatchEventWith(TypePicker.GAME_START, false);
    //}
    GamePlayingPanel.prototype.onTouchTab = function (e) {
        // this.dispatchEventWith(GameStartPanel.GAME_START);
    };
    //结束界面，释放监听
    GamePlayingPanel.prototype.end = function () {
        this.startBtn.touchEnabled = false;
        if (this.startBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        this.removeChildren();
    };
    return GamePlayingPanel;
}(egret.Sprite));
__reflect(GamePlayingPanel.prototype, "GamePlayingPanel");
//# sourceMappingURL=GamePlayingPanel.js.map