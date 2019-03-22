
module game {

    export class Select3ScreenIni extends eui.Component {

        public constructor() {
            super();
            this.skinName = "src/Skin/select3ScreenTypeSkin.exml";
            this.addEventListener(eui.UIEvent.COMPLETE,this.createCompleteEvent,this);
             this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP,this.To4Screen,this);
             
             this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP,this.To6Screen,this);
             this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toShuffle,this);
           
         }
        public toShuffle(): void {
            //重置
            //resetShuffle
            Data.currentMainIndex = 0;
            game.AppFacade.getInstance().sendNotification("toshuffle");

        }
        public createCompleteEvent(event: eui.UIEvent): void {
           // this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP,this.To4Screen,this);

           // this.removeEventListener(eui.UIEvent.COMPLETE,this.createCompleteEvent,this);
            // game.AppFacade.getInstance().registerMediator( new RoleMediator(this) );
        }
        public To4Screen(event: eui.UIEvent): void { 
            game.AppFacade.getInstance().sendNotification("to4");
        }
        public To6Screen(event: eui.UIEvent): void {
            game.AppFacade.getInstance().sendNotification("to6");
        }
        
        public btnLeft: eui.Button;
        public btnRight: eui.Button;
        public btnStart: eui.Button;
        public input1: eui.Label;
        public showText: eui.Label;

        public partAdded(partName: string,instance: any): void {
            super.partAdded(partName,instance);
        }
    }
}