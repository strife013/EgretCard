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
    var PickCard = (function (_super) {
        __extends(PickCard, _super);
        function PickCard() {
            var _this = _super.call(this) || this;
            _this.skinName = "src/Skin/PickCardSkin.exml";
            return _this;
        }
        return PickCard;
    }(eui.Component));
    game.PickCard = PickCard;
    __reflect(PickCard.prototype, "game.PickCard");
})(game || (game = {}));
//# sourceMappingURL=PickCard.js.map