var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cardDetail = (function (_super) {
    __extends(cardDetail, _super);
    ///name为资源名称
    function cardDetail(name, index) {
        var _this = _super.call(this) || this;
        _this._name = name;
        _this._index = index;
        _this.closebtn = new egret.Bitmap();
        _this.closebtn.touchEnabled = true;
        _this.closebtn.texture = RES.getRes("close_png");
        _this.closebtn.x = _this.width - _this.closebtn.width;
        _this._card = new egret.Bitmap();
        _this._card.texture = RES.getRes(name);
        _this.init();
        return _this;
    }
    Object.defineProperty(cardDetail.prototype, "SetState", {
        set: function (state) {
            //状态变化
            this._state = state;
        },
        enumerable: true,
        configurable: true
    });
    cardDetail.prototype.init = function () {
        this.touchEnabled = false;
        this._iH = 300;
        this._text = new egret.TextField();
        //  this._text.text = this.getFlyWords(); 
        this._card.scaleX = 0.5;
        this._card.scaleY = 0.5;
        this.width = this._card.width * this._card.scaleX;
        this.height = this._card.height * this._card.scaleY;
        //this._card.height = 10;
        this._card.touchEnabled = true;
        this._card.x = 0;
        this._card.y = 0;
        this.closebtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClose, this);
        this.addChild(this._card);
        this.addChild(this._text);
        this.addChild(this.closebtn);
    };
    //隐藏
    cardDetail.prototype.onClose = function (evt) {
        egret.Tween.get(this)
            .to({ y: -300 }, 550, egret.Ease.cubicInOut)
            .call(function () { this.dispatchEvent(new egret.Event('hideRule', true)); }, this);
    };
    cardDetail.prototype.rotationCard = function () {
        //tw.to({ x: 280,y: 0 },500).to({ x: 280,y: 300 },500).to({ x: 0,y: 300 },500).to({ x: 0,y: 0 },500);                 //位移
        // tw.call(this.rotationCard,this);   
    };
    cardDetail.prototype.moveBegin = function (evt) {
    };
    cardDetail.prototype.endmove = function (e) {
    };
    cardDetail.prototype.showInfo = function (targetcard) {
        //设置全局显示卡牌信息
        Data.showCardDetail._card.texture = RES.getRes(this._name);
        this.introAnim(targetcard);
    };
    cardDetail.prototype.introAnim = function (targetcard) {
        var selfcard = targetcard;
        var tw = egret.Tween.get(Data.showCardDetail);
        tw.to({ y: 400, x: 100 }, 1000, egret.Ease.cubicInOut);
        tw.call(function () {
            Data.CardShadows[targetcard.setCardShadowIndex].addEventListener(egret.TouchEvent.TOUCH_TAP, targetcard.showDetailInfo, targetcard);
        });
    };
    cardDetail.prototype.move = function (e) {
    };
    cardDetail.prototype.fall = function (e) {
        //todo 掉落動畫
    };
    ///获取气球上随机的话语
    cardDetail.prototype.getFlyWords = function () {
    };
    return cardDetail;
}(egret.DisplayObjectContainer));
__reflect(cardDetail.prototype, "cardDetail");
//# sourceMappingURL=cardDetail.js.map