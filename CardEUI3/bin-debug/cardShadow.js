var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cardShadow = (function (_super) {
    __extends(cardShadow, _super);
    function cardShadow(name) {
        var _this = _super.call(this) || this;
        _this._name = name;
        _this.init();
        return _this;
    }
    Object.defineProperty(cardShadow.prototype, "SetState", {
        set: function (state) {
            //状态变化
            this._state = state;
        },
        enumerable: true,
        configurable: true
    });
    cardShadow.prototype.init = function () {
        var data1 = RES.getRes("s3_json");
        var tex1 = RES.getRes("s3_png");
        var mcf1 = new egret.MovieClipDataFactory(data1, tex1);
        this._cardShadow = new egret.MovieClip(mcf1.generateMovieClipData("backpic_elected3"));
        this._cardShadow.alpha = 0.1;
        this._cardShadow.scaleX = 0.5;
        this._cardShadow.scaleY = 0.5;
        this.addChild(this._cardShadow);
        this._cardShadow.play(-1);
    };
    return cardShadow;
}(egret.DisplayObjectContainer));
__reflect(cardShadow.prototype, "cardShadow");
//# sourceMappingURL=cardShadow.js.map