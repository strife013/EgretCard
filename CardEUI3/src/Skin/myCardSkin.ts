module game {
	/**
	 *
	 * @author 
	 *
	 */
    export class myCardSkin extends eui.Component {

        public constructor() {
            super();
            this.skinName = "src/Skin/myCardSkin.exml"; 
        }
        public setData(obj:any){
            this.lblCardName.text = obj.name;
            this.lblCardKey.text = obj.key;
            //this.lblCardLike.text = obj.like;
            this.lblCardMain.text = obj.key;
            this.lblCardDesc.textFlow = (new egret.HtmlTextParser).parse( obj.desc);
            this.cardimg.texture = RES.getRes(obj.cardname);
        }
        public btnClose: eui.Button; 
        public btnStart: eui.Button;
        public input1: eui.Label;
        public lblCardName: eui.Label;
        public lblCardKey: eui.Label;
        public lblCardLike: eui.Label;
        public lblCardMain: eui.Label;
        public lblCardDesc: eui.Label;
        public cardimg:eui.Image;
    }
}
