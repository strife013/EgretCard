class ViewManager extends egret.Sprite {
    public constructor() {
        super();
        this.init();
    }

    private static instance: ViewManager;
    private typePickerPanel: TypePicker; // 开始界面
    //private gameEndPanel: GameEndPanel; //游戏结束界面
    private gamePlayingPanel: GamePlayingPanel; //游戏中界面 

    private gameShufflePanel: GameShuffle; //洗牌切牌界面 
    /**
     * 这里初始化
     */
    private init() {
        this.typePickerPanel = new TypePicker();
       // this.gameEndPanel = new GameEndPanel();
        this.gamePlayingPanel = new GamePlayingPanel();
        this.gameShufflePanel = new GameShuffle();


        this.addChild(this.typePickerPanel);
        this.typePickerPanel.start();
        
        this.addEventListener(ChangeSceneEvent.changeSceneEvent, this.onChangeScene, this);

    }

    public start() {
        this.addEventListener(ChangeSceneEvent.changeSceneEvent, this.onChangeScene, this);
    }
    public static getInstance(): ViewManager {
        if (ViewManager.instance == null) {
            ViewManager.instance = new ViewManager();
        }

        return ViewManager.instance;
    }

    public onChangeScene(e: ChangeSceneEvent) {
        if(e.obj &&e.obj.end)
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
    }
} 