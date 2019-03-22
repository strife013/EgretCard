class TypePicker extends egret.Sprite {
  
    private bg: egret.Bitmap;// 背景
    private sy: egret.Bitmap;// 事业
    private aq: egret.Bitmap;// 爱情
    private qt: egret.Bitmap;// 其他
    private startBtn: egret.TextField;//这里我们使用textfield当做按钮
    public constructor() {
        super();
        this.init();
    }
         
    //开启监听
    public start() {
        //this.startBtn.touchEnabled = true;
        //this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabaq,this);
    }
    //初始化
    private init() {
                //var aqEvent = new egret.Event(egret.TouchEvent.TOUCH_TAP, false, false);
        //aqEvent.data = this.aq.name;

        this.bg = new egret.Bitmap(RES.getRes('base_png'));
        this.addChild(this.bg);
 
        this.aq = new egret.Bitmap(RES.getRes('aq_png'));
        this.aq.touchEnabled = true;
        this.aq.name = "aq"; 
        this.aq.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabaq, this,false);
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
         
    }


    private onTouchTabqt(e: egret.TouchEvent) {
        this.dispatchSceneTouchEvent("qt");
    }
    private onTouchTabaq(e: egret.TouchEvent) {
        this.dispatchSceneTouchEvent("aq");
    }
    private onTouchTabsy(e: egret.TouchEvent) {
        this.dispatchSceneTouchEvent("sy");
    }
    private dispatchSceneTouchEvent(obj) {
        var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.changeSceneEvent);
        changeEvent.eventType = Data.startPlayingPanel;
        changeEvent.obj = obj; 
        ViewManager.getInstance().dispatchEvent(changeEvent); 
    }
         
    //结束界面，释放监听
    public end() {
        this.startBtn.touchEnabled = false;
        if (this.aq.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.aq.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabaq,this);
        }
        if (this.sy.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.sy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabsy, this);
        }

        if (this.qt.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.qt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTabqt, this);
        }
    }
} 