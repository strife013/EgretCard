class GamePlayingPanel extends egret.Sprite {
     
    private bg: egret.Bitmap;// 背景
    private backBtn: egret.Bitmap;// 事业
    private aq: egret.Bitmap;// 爱情
    private qt: egret.Bitmap;// 其他
    private startBtn: egret.TextField;//这里我们使用textfield当做按钮
    private handShuffleBtn: egret.TextField;
    //private toTypePickerBtn: egret.TextField;

    private cardList: Array<card>;
    //牌顺序
    private cardListOrder: Array<number>;
    public constructor() {
        super();
        this.startBtn = new egret.TextField();
        this.handShuffleBtn = new egret.TextField();
        this.handShuffleBtn.x = Data.stage.width - 100;
        //this.toTypePickerBtn = new egret.TextField();
        //this.toTypePickerBtn.y =  Data.stage.height - 50;

        this.cardListOrder = new Array<number>();
        this.backBtn = new egret.Bitmap();
        this.backBtn.texture = RES.getRes("arrow@3x_png");
        //this.cardList = new Array<card>();

   
    }
         
    //开启监听
    //shadowpos
    public start(shadowpos:any,title:any) {
        this.init(shadowpos,title);
    }

    //自动洗牌
    private autoShuffle() {
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveManualShuffle, this);

        var cardorder = CollisionUtils.getRandomCardIndex(Data.CardNames.length);
        var self = this;
        this.cardList.forEach(function (v, i) {
            v.ToBack();
            v.rotationCard(cardorder[i]);
            //console.log("indexorder:", cardorder[i], v.indexorder);
            self.setChildIndex(v, v.indexorder+10);
        });
        this.cardList.sort(function(v, i) {
            return v.indexorder - i.indexorder;
        });
        this.cardList.forEach(function (v, i) { 
            console.log("indexorder2:", cardorder[i], v.indexorder);
            self.setChildIndex(v, v.indexorder+10);
        });
    }
    //手动洗牌
    private manualShuffle() {
        var cardorder = CollisionUtils.getRandomCardIndex(Data.CardNames.length);
        //移除鼠标移动事件，监听鼠标移动事件

        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveManualShuffle, this);
        //egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, Data.CurCard.endmove, this);

        var self = this;
        this.cardList.forEach(function (v, i) {
            v.ToBack();
            v.toFixPosition();
            //v.rotationCard(cardorder[i]);
            self.setChildIndex(v, cardorder[i]+10);
        }); 
        //shadow初始化 
    }
    private moveManualShuffle(e: egret.TouchEvent) {
        var epoint = new egret.Point(e.stageX,e.stageY) ;
       
        this.cardList.forEach(function (v, i) {
            //删除鼠标点击事件？
            v.rotationCardByPoint(epoint);
        }); 
    }

    private toTypePickerView() {
        var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.changeSceneEvent);
        changeEvent.eventType = Data.typePicker;
        changeEvent.obj = this;
        ViewManager.getInstance().dispatchEvent(changeEvent); 
    }

    //初始化
    //初始化card position  [{ x: 60, y: 500 }, { x: 300, y: 500 }, { x: 160, y: 300 }]
    private init(cardShadowPos:any,title:any) {
        //清空
        this.cardList = new Array<card>();
        Data.CardShadows = new Array<cardShadow>(); 
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

       
        
        
        var stageW: number = Data.stage.stageWidth;
        var stageH: number = Data.stage.stageHeight;
        var cardorder = CollisionUtils.getRandomCardIndex(Data.CardNames.length);

        for (var i = 0; i < Data.CardNames.length; i++) {
            var fm: card = new card(Data.CardNames[i], i);
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
    
    }

    //private onTouchaq(e: egret.TouchEvent) {
    //    //e.
    //    this.dispatchEventWith(TypePicker.GAME_START, false);
    //}

    private onTouchTab(e: egret.TouchEvent) {
        // this.dispatchEventWith(GameStartPanel.GAME_START);
    }
         
    //结束界面，释放监听
    public end() {
        this.startBtn.touchEnabled = false;
        if (this.startBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        this.removeChildren();

    }
} 