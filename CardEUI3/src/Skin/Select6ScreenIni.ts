
module game {

    export class Select6ScreenIni extends eui.Component {

        public constructor() {
            super();
            this.skinName = "src/Skin/select6ScreenTypeSkin.exml";
            this.addEventListener(eui.UIEvent.COMPLETE,this.createCompleteEvent,this);
       
            this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toShuffle,this);
            this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP,this.to3screen,this);
        }
        public toShuffle():void
        {
            //重置
            //resetShuffle
            Data.currentMainIndex=2;
            game.AppFacade.getInstance().sendNotification("toshuffle");
            
        }
        public to3screen(): void {
            game.AppFacade.getInstance().sendNotification("to3");
        }
        public to4screen(): void {
            game.AppFacade.getInstance().sendNotification("to4");
        }
        public createCompleteEvent(event: eui.UIEvent): void {
            this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP,this.To3Screen,this);
            
            this.removeEventListener(eui.UIEvent.COMPLETE,this.createCompleteEvent,this);
            // game.AppFacade.getInstance().registerMediator( new RoleMediator(this) );
        }
        public To3Screen(event:eui.UIEvent):void{
             game.AppFacade.getInstance().sendNotification("to3");
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