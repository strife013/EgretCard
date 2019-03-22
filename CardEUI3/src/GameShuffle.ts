class GameShuffle extends eui.Component {

    private bg: egret.Bitmap;// 背景
    private backBtn: egret.Bitmap;// 事业
    private wordsback: egret.Bitmap;// 文字输入框背景
    private wordsValue: egret.TextField;//输入框内文字
     
    public lblDescLayer: eui.Label;
    public lblDesc: eui.Label;
    public btnShuffle: eui.Button;
    public lblShadowCardLayer: eui.Label;
    public btnBack: eui.Button; 
   // private autoShuffleBtn: egret.TextField;//这里我们使用textfield当做按钮
    private handShuffleBtn: egret.TextField;
    private bottomBtn: egret.TextField;
    private title: egret.TextField;
    //private toTypePickerBtn: egret.TextField;
    private localStageHeight:number;
    private cardList: Array<card>;
    //牌顺序
    private cardListOrder: Array<number>;
    public constructor() {
        super();
        this.skinName = "src/Skin/shuffleSkin.exml";
        this.lblShadowCardLayer.visible = false;
        this.btnBack.touchEnabled = true;
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toIniScreen, this);
        
        this.localStageHeight = Data.stage.height;  
        this.handShuffleBtn = new egret.TextField();
        this.handShuffleBtn.x = Data.stage.width - 150;
        this.handShuffleBtn.y = Data.stage.height - 50; 

        this.cardListOrder = new Array<number>();
        this.backBtn = new egret.Bitmap();
        this.backBtn.texture = RES.getRes("arrow@3x_png");
        //this.cardList = new Array<card>();

        this.wordsback = new egret.Bitmap();
        this.wordsback.texture = RES.getRes("wordsback_png");
        this.wordsback.x = 0;
        this.wordsback.y = Data.stage.stageHeight * 4 / 5-50;
        this.wordsback.width = Data.stage.stageWidth;

        this.wordsValue = new egret.TextField();
        this.wordsValue.x = 0;
        this.wordsValue.y = Data.stage.stageHeight * 4 / 5;
        this.wordsValue.width = Data.stage.stageWidth ;

        this.bottomBtn = new egret.TextField();
        this.bottomBtn.text = "自动切牌";
        this.bottomBtn.x = Data.stage.height * 1 / 2;
        this.bottomBtn.y = Data.stage.height * 4 / 5-100;

        this.title = new egret.TextField();
      
        this.start("","");
    }
         
    //开启监听
    //shadowpos
    public start(shadowpos: any,title:string) {
        this.init(shadowpos, title);
    }
    private toIniScreen() {
        //game.AppFacade.getInstance().sendNotification(MainNotify.OPEN_MAIN);
        game.AppFacade.getInstance().sendNotification("to4");
    }
    private autoShffleTimer: any;
    //自动洗牌
    private autoShuffle() {
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveManualShuffle, this);
        this.backWordsToBottom();
      
        this.lblDesc.text = "自动洗牌中请稍后";
        this.bottomBtn.visible = false;
        this.btnShuffle.touchEnabled = false;
        var cardorder = CollisionUtils.getRandomCardIndex(Data.CardNames.length);
        var self = this;
        this.cardList.forEach(function (v, i) {
            v.ToBack();
            v.setRotationPointValue();
            v.rotationCard(cardorder[i]);
            //console.log("indexorder:", cardorder[i], v.indexorder);
            self.setChildIndex(v, v.indexorder + 10);
        });
       
        //保持和自动洗牌时间一致
        this.autoShffleTimer =  setTimeout(function() {
            //self.bottomBtn.visible = true;
            self.btnShuffle.label = "自动切牌";
            self.btnShuffle.touchEnabled = true;
            self.btnShuffle.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.autoShuffle, self);
            self.btnShuffle.addEventListener(egret.TouchEvent.TOUCH_TAP, self.sliceCards, self);
            
            self.lblDesc.text = "牌已经洗好了，继续集中你的注意力，默念你的问题，诚意是整个占卜过程中最重要的部分。因为只要诚意才能启动塔罗牌超自然的预知玄力。好了，现在我们开始切牌。";

        }, Data.MaxRotationSecond * 1000);

        this.cardList.sort(function (v, i) {
            return v.indexorder - i.indexorder;
        });
        this.cardList.forEach(function (v, i) { 
            self.setChildIndex(v, v.indexorder + 10);
        });
    }
    //提示文字和背景到中间，下方可以显示按钮
    private backWordsToCenter() { 
        var tw = egret.Tween.get(this.wordsValue);
        var twb = egret.Tween.get(this.wordsback);
        var targetY = this.localStageHeight *4/5 - 200;

        var twpos = { y: targetY };
        tw.to(twpos,1000);
        twb.to(twpos, 1000);
    }

    //提示文字和背景到底部
    private backWordsToBottom() {
        var tw = egret.Tween.get(this.wordsValue);
        var twb = egret.Tween.get(this.wordsback);
        var targetY = this.localStageHeight * 4 / 5 - 50; //Data.stage.height * 4 / 5 ;

        var twpos = { y: targetY };
        tw.to(twpos, 1000);
        twb.to(twpos, 1000);
    }

//手动洗牌
    private manualShuffle() {
        var cardorder = CollisionUtils.getRandomCardIndex(Data.CardNames.length);
        //移除鼠标移动事件，监听鼠标移动事件
        this.lblDesc.text = "洗牌中请稍后";

        this.bottomBtn.visible = true;
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
    }
    private moveManualShuffle(e: egret.TouchEvent) {
        var epoint = new egret.Point(e.stageX, e.stageY);

        this.cardList.forEach(function (v, i) {
            //删除鼠标点击事件？
            v.rotationCardByPoint(epoint);
        });
    }
    private sliceCards() {
        //play movie 
        var self = this;
        var cardnumber = Data.CardNames.length;
        var delayTime = 0;
        self.btnShuffle.touchEnabled = false;
        //到初始位置

        this.cardList.forEach(function (v, i) {

            var placeX = v.anchorOffsetX * self.scaleX + Data.stage.stageWidth / 2 - 30;
            var placeY = Data.stage.stageHeight * 1 / 5 + v.indexorder * 0.02;
            v.toPosition({ x: placeX, y: placeY, rotation: 0 }, 800);

        });

        //切牌动画向下移动
        //下，上 ，中向下合并，下向上合并
        delayTime += 800;
        setTimeout(function () {
            self.cardList.forEach(function (v, i) {
                if (v.indexorder < cardnumber / 3) {
                    var placeX = v.anchorOffsetX * self.scaleX + Data.stage.stageWidth / 2 - 30;
                    var placeY = 300 + Data.stage.stageHeight * 1 / 5;
                    v.toPosition({ x: placeX, y: placeY }, 800);
                }
            });
        }, delayTime);

        delayTime += 800;
        setTimeout(function () {
            self.cardList.forEach(function (v, i) {
                if (v.indexorder > cardnumber * 2 / 3) {
                    var placeX = v.anchorOffsetX * self.scaleX + Data.stage.stageWidth / 2 - 30;
                     var placeY = 150 + Data.stage.stageHeight * 1 / 5;
                    //  var placeY =   Data.stage.stageHeight * 1 / 5;
                    v.toPosition({ x: placeX, y: placeY }, 800);
                }
            });
        }, delayTime);

        delayTime += 800;
        setTimeout(function () {
            self.cardList.forEach(function (v, i) {
                if (v.indexorder >= cardnumber / 3 && v.indexorder <= cardnumber * 2 / 3) {
                    var placeX = v.anchorOffsetX * self.scaleX + Data.stage.stageWidth / 2 - 30;
                    var placeY = 300 + Data.stage.stageHeight * 1 / 5;
                    v.toPosition({ x: placeX, y: placeY }, 800);
                }
            });
        }, delayTime);

        delayTime += 800;
        setTimeout(function () {
            self.cardList.forEach(function (v, i) {

                var placeX = v.anchorOffsetX * self.scaleX + Data.stage.stageWidth / 2 - 30;
              var placeY = 150 + Data.stage.stageHeight * 1 / 5;
               //   var placeY =  Data.stage.stageHeight * 1 / 5;
                v.toPosition({ x: placeX, y: placeY }, 800);
                self.btnShuffle.touchEnabled = true;
                self.btnShuffle.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.autoShuffle, self);
                self.btnShuffle.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.sliceCards, self);
                self.btnShuffle.label = "开始选牌";
                self.lblDesc.text = "牌已经切完，请开始选牌";
                self.btnShuffle.addEventListener(egret.TouchEvent.TOUCH_TAP, self.toPickCard, self);
            });
        }, delayTime);

    }
    private toPickCard(){
        //game.AppFacade.getInstance().sendNotification("topickcard");
        //扇形
        this.cardList.forEach(function(v,i) { 
                
            v.toPickPosition();
        });
        
        this.pickCards();
        this.btnShuffle.touchEnabled=false;
    }
    
     private setPickCard(index :number){
         var cshadow: cardShadow = new cardShadow("card" + index);
         cshadow.x = Data.currentShadowPosition[Data.currentMainIndex][index].x;
         cshadow.y = Data.currentShadowPosition[Data.currentMainIndex][index].y;
         this.addChild(cshadow); 
         Data.CardShadows.push(cshadow);
     }
     private currentSetIndex = 0;
     public pickCards(){
         this.lblShadowCardLayer.visible = true;
         //第一个位置
         if (this.currentSetIndex < Data.currentShadowPosition[Data.currentMainIndex].length)
             this.setPickCard(this.currentSetIndex++);
         else {
             //设置展示牌面动画
             this.lblDesc.text = "请解牌面！";
             this.btnShuffle.label = "请解牌面";
             this.btnShuffle.touchEnabled=true;
             this.btnShuffle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toPickCard, this); 
             this.btnShuffle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toShowCards, this);
         }
       
     }
    private toShowCards() {
        //展示卡牌
        this.lblDescLayer.visible = false;
        this.lblDesc.visible = false;
        this.lblShadowCardLayer.visible = false;
        
        Data.CardShadows.forEach(function(v,i) {
            v.visible = false;
        });
        
        this.cardList.forEach(function (v, i) {
            if (v.setCardShadowIndex<0)
                v.visible = false;
                else{
              var tw =  egret.Tween.get(v);
              tw.to({ x: Data.currentShowPosition[Data.currentMainIndex][v.setCardShadowIndex].x,y: Data.currentShowPosition[Data.currentMainIndex][v.setCardShadowIndex].y},1200);      
              v.Blink();
              v.touchEnabled=true;
              v.addEventListener(egret.TouchEvent.TOUCH_TAP,v.backToFont,v);
          }
        });
//动画 到显示位置后 闪烁，并且可以点击展开
       
        
        //game.AppFacade.getInstance().sendNotification("toShowCards"); 
    }
    
    private toTypePickerView() {
        game.AppFacade.getInstance().sendNotification("to4"); 
    }

    public resetShuffle() {
        
        this.start("", "");
        var self = this;
         
        Data.CardShadows.forEach(function (v, i) {
            self.removeChild(v);
        });
        Data.CardShadows.length = 0;
        this.currentSetIndex = 0;

        this.currentSetIndex = 0;
        this.lblShadowCardLayer.visible = false;
        this.lblDesc.visible = true;
        this.lblDescLayer.visible = true;
        this.lblDesc.text = "请洗牌";
        this.btnShuffle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sliceCards, this);
        this.btnShuffle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toPickCard, this);
        this.btnShuffle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toShowCards, this);
        this.btnShuffle.label = "自动洗牌";
        this.btnShuffle.touchEnabled = true;
        if (this.autoShffleTimer) {
            clearTimeout(this.autoShffleTimer);
            this.autoShffleTimer = null;
        }
        this.btnShuffle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.autoShuffle, this);
    }
    //初始化
    //初始化card position  [{ x: 60, y: 500 }, { x: 300, y: 500 }, { x: 160, y: 300 }]
    private init(cardShadowPos: any,title:string) {
        //清空
        var self = this;
        if (this.cardList != null && this.cardList.length > 0) {
            this.cardList.forEach(function (v,i) {
                self.removeChild(v);
            });
           // this.cardList.every(function(d){
             //   this.removeChild(d);
               // });
           
        }

        this.cardList = new Array<card>(); 
         

        var stageW: number = Data.stage.stageWidth;
        var stageH: number = Data.stage.stageHeight;
        var cardorder = CollisionUtils.getRandomCardIndex(Data.CardNames.length);

        for (var i = 0; i < Data.CardNames.length; i++) {
            var fm: card = new card(Data.CardNames[i], i);
           // fm.rotationCard(cardorder[i]);
          
            fm.x = stageW /   3;
            fm.y = stageH /   3+ i*0.05;
            
             
      
            fm.iniIndex = i;
           
            //fm.x = stageW / (i + 3);
           // fm.y = stageH / (i + 3);
            this.cardList.push(fm);
            this.addChild(fm);
            //todo test
           //fm.Blink();
            // this.addChildAt(fm, cardorder[i]+10);
        }
       
        this.cardList.sort(function (v, i) {
            return v.indexorder - i.indexorder;
        });
       // this.cardList.forEach(function (v, i) { 
       //     self.setChildIndex(v, v.indexorder + 10);
       // });
          

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
        this.removeChildren();

    }
} 