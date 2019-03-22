var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ViewManager = (function (_super) {
    __extends(ViewManager, _super);
    function ViewManager() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    /**
     * 这里初始化
     */
    ViewManager.prototype.init = function () {
        this.typePickerPanel = new TypePicker();
        // this.gameEndPanel = new GameEndPanel();
        this.gamePlayingPanel = new GamePlayingPanel();
        this.gameShufflePanel = new GameShuffle();
        this.addChild(this.typePickerPanel);
        this.typePickerPanel.start();
        this.addEventListener(ChangeSceneEvent.changeSceneEvent, this.onChangeScene, this);
    };
    ViewManager.prototype.start = function () {
        this.addEventListener(ChangeSceneEvent.changeSceneEvent, this.onChangeScene, this);
    };
    ViewManager.getInstance = function () {
        if (ViewManager.instance == null) {
            ViewManager.instance = new ViewManager();
        }
        return ViewManager.instance;
    };
    ViewManager.prototype.onChangeScene = function (e) {
        if (e.obj && e.obj.end)
            e.obj.end();
        this.removeChildren();
        switch (e.eventType) {
            case Data.typePicker:
                this.typePickerPanel.start();
                this.addChild(this.typePickerPanel);
                break;
            case Data.startPlayingPanel:
                var shadowObjs = [{ x: 60, y: 500 }, { x: 300, y: 500 }, { x: 160, y: 300 }];
                var title = "爱情占卜";
                switch (e.obj) {
                    case "sy":
                        shadowObjs = [{ x: 60, y: 500 }, { x: 300, y: 500 }, { x: 160, y: 300 }];
                        title = "事业占卜";
                        break;
                    case "aq":
                        shadowObjs = [{ x: 60, y: 500 }, { x: 300, y: 500 }, { x: 60, y: 300 }, { x: 300, y: 300 }];
                        break;
                    case "qt":
                        shadowObjs = [{ x: 60, y: 500 }, { x: 300, y: 500 }];
                        title = "其他占卜";
                        break;
                    default:
                }
                this.gamePlayingPanel.start(shadowObjs, title);
                this.addChild(this.gamePlayingPanel);
                break;
            case Data.shufflePanel:
                var title = "爱情占卜";
                switch (e.obj) {
                    case "sy":
                        title = "事业占卜";
                        break;
                    case "aq":
                        break;
                    case "qt":
                        title = "其他占卜";
                        break;
                    default:
                }
                this.gameShufflePanel.start(shadowObjs, title);
                this.addChild(this.gameShufflePanel);
                break;
            default:
                break;
        }
    };
    return ViewManager;
}(egret.Sprite));
__reflect(ViewManager.prototype, "ViewManager");
//# sourceMappingURL=ViewManager.js.map