
module game {

    export class TypeSelect extends eui.Component {

        public constructor() {
            super();
            this.skinName = "src/Skin/typeSelectSkin.exml";
            this.addEventListener(eui.UIEvent.COMPLETE,this.createCompleteEvent,this);

            this.btnqt.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toqt,this);
            this.btnsy.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tosy,this);
            this.btnaq.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toaq,this);
           // this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP,this.to3screen,this);
        }
        
        public btnqt: eui.Button;
        public btnsy: eui.Button;
        public btnaq: eui.Button;
        
        public tosy(): void { 
            game.AppFacade.getInstance().sendNotification("to4");
        }
        public toaq(): void {
            game.AppFacade.getInstance().sendNotification("to4");
        }
        public toqt(): void {
            game.AppFacade.getInstance().sendNotification("to4");
        }
        public createCompleteEvent(event: eui.UIEvent): void {
        
        }
        public To3Screen(event: eui.UIEvent): void {
          
        }
     

        public partAdded(partName: string,instance: any): void {
            super.partAdded(partName,instance);
        }
    }
}