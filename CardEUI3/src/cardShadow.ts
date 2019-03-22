class cardShadow extends egret.DisplayObjectContainer {
    public constructor(name: string) {
        super();
        this._name = name;
        this.init();
    }
     
    private set SetState(state: string) {
        //状态变化
        this._state = state;
    }
    private _state: string;
    public  _name: string;
    private _man: egret.MovieClip;
    public _cardShadow: egret.MovieClip;
    private _text: egret.TextField;
  
    private init() {


        var data1 = RES.getRes("s3_json");
        var tex1 = RES.getRes("s3_png");
        var mcf1: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data1, tex1); 
        this._cardShadow = new egret.MovieClip(mcf1.generateMovieClipData("backpic_elected3"));
        this._cardShadow.alpha = 0.1;
        this._cardShadow.scaleX = 0.5;
        this._cardShadow.scaleY = 0.5;
       
        this.addChild(this._cardShadow);  
        this._cardShadow.play(-1);
        
    }
 
    private xs: number;
    private ys: number;
    public hasCard:boolean;
    public card:card;
  
 

}