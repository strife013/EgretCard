 
class cardDetail extends egret.DisplayObjectContainer {
    ///name为资源名称
    public constructor(name: string, index: number) {
        super();
        this._name = name;
        this._index = index;
        this.closebtn = new egret.Bitmap();
        this.closebtn.touchEnabled = true;
        this.closebtn.texture = RES.getRes("close_png");
        this.closebtn.x = this.width - this.closebtn.width;

        this._card = new egret.Bitmap();
        this._card.texture = RES.getRes(name);
        this.init();
    } 
    private set SetState(state: string) {
        //状态变化
        this._state = state;
    } 
    public _iH:number;
    public _index: number;
    private _state: string;
    public _name: string; 
    public _card: egret.Bitmap;
    public closebtn: egret.Bitmap;
    private title: egret.TextField;
    private _text: egret.TextField; 
    private init() {
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
    }
     
    //隐藏
    private onClose(evt: egret.TouchEvent): void {
        egret.Tween.get(this)
            .to({ y: -300 }, 550, egret.Ease.cubicInOut)
            .call(function () { this.dispatchEvent(new egret.Event('hideRule', true)); }, this);
    }
    private rotationCard() { 
       
        //tw.to({ x: 280,y: 0 },500).to({ x: 280,y: 300 },500).to({ x: 0,y: 300 },500).to({ x: 0,y: 0 },500);                 //位移
        // tw.call(this.rotationCard,this);   
    }
    private xs: number;
    private ys: number;

    private moveBegin(evt: egret.TouchEvent) {
         
    }
    private endmove(e: egret.TouchEvent) {
       
    }


    public showInfo(targetcard:card): void {  
        //设置全局显示卡牌信息
        Data.showCardDetail._card.texture = RES.getRes(this._name);
        this.introAnim(targetcard);
    }

    private introAnim(targetcard:card): void {
        var selfcard = targetcard;
        var tw = egret.Tween.get(Data.showCardDetail);
            tw.to({ y: 400, x: 100 }, 1000, egret.Ease.cubicInOut);
        tw.call(function() {
            Data.CardShadows[targetcard.setCardShadowIndex].addEventListener(egret.TouchEvent.TOUCH_TAP, targetcard.showDetailInfo, targetcard);
        });
       
    }

    private move(e: egret.TouchEvent) {
       
    }

    private fall(e: egret.Event) {
        //todo 掉落動畫

         
    }

     
    ///获取气球上随机的话语
    private getFlyWords() {

    }

}