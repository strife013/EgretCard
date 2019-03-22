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
    /**
     *
     * @author
     *
     */
    var myCardSkin = (function (_super) {
        __extends(myCardSkin, _super);
        function myCardSkin() {
            var _this = _super.call(this) || this;
            _this.skinName = "src/Skin/myCardSkin.exml";
            return _this;
        }
        myCardSkin.prototype.setData = function (obj) {
            this.lblCardName.text = obj.name;
            this.lblCardKey.text = obj.key;
            //this.lblCardLike.text = obj.like;
            this.lblCardMain.text = obj.key;
            this.lblCardDesc.textFlow = (new egret.HtmlTextParser).parse(obj.desc);
            this.cardimg.texture = RES.getRes(obj.cardname);
        };
        return myCardSkin;
    }(eui.Component));
    game.myCardSkin = myCardSkin;
    __reflect(myCardSkin.prototype, "game.myCardSkin");
})(game || (game = {}));
//# sourceMappingURL=myCardSkin.js.map