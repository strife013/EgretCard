/**
  * 背包面板
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  * screenType show mediator
  */
module game {

    export class BackpackMediator extends BaseMediator {
        public static NAME: string = "BackpackMediator";

        public constructor(viewComponent: any = null) {
            super(BackpackMediator.NAME,viewComponent); 
        }

        public listNotificationInterests(): Array<any> {
            return [
                "to3","to4","to6","toshuffle","topickcard","toShowCards"
            ];
        }
        private type3screenCard: Select3ScreenIni = new Select3ScreenIni();
        private type4screenCard: SelectScreenIni = new SelectScreenIni();
        private type6screenCard: Select6ScreenIni = new Select6ScreenIni();
        private shuffleScreen: GameShuffle = new GameShuffle();
        private PickCard: PickCard = new PickCard();
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch(notification.getName()) {
                case "toShowCards":
                  
                break;
                case "topickcard":
                    this.shuffleScreen.pickCards();
                    break;
                case "toshuffle": {
                    //显示
                    this.closePanel(0);
                    this.shuffleScreen.resetShuffle();
                    this.showUI(this.shuffleScreen,false,0,0,2);
                    break;
                }
                case "to3": {
                    //显示
                    this.closePanel(0); 
                    this.shuffleScreen.resetShuffle();
                    this.showUI(this.type3screenCard,false,0,0,4);
                    break;
                }
                case "to4": {
                    //显示角色面板
                    this.closePanel(0);
                    this.shuffleScreen.resetShuffle();
                    this.showUI(this.type4screenCard,false,0,0,3);
                    break;
                }
                case "to6": {
                    //显示角色面板
                    this.closePanel(0);
                    this.shuffleScreen.resetShuffle();
                    this.showUI(this.type6screenCard,false,0,0,4);
                    break;
                }
                case PanelNotify.CLOSE_BACKPACK: {
                    this.closePanel(1);
                    break;
                }
            }
        }       

        /**
         * 初始化面板ui
         */
        public initUI(): void {
           // this.type4screenCard.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.to3screen,this);
           //this.type4screenCard.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP,this.to3screen,this);
           //this.type3screenCard.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP,this.to4screen,this);
          //  this.backpackPanel.saveProxy.addEventListener(egret.TouchEvent.TOUCH_TAP,this.saveProxyButtonClick,this);
        }	
       // public to3screen(): void {
       //      game.AppFacade.getInstance().sendNotification("to3");
       //  }
       // public to4screen(): void { 
       //     game.AppFacade.getInstance().sendNotification("to4");
       //}
        /**
         * 初始化面板数据
       
        public initData(): void {

        }

        private saveProxyButtonClick(event: egret.TouchEvent): void {
            //P.getGameDataProxy().setGameName(this.backpackPanel.input1.text);
           // this.backpackPanel.showText.text += "保存成功...\n" + P.getGameDataProxy().getGameName() + "\n";
        }  
        private readProxyButtonClick(event: egret.TouchEvent): void {
          //  this.backpackPanel.showText.text += P.getGameDataProxy().getGameName() + "\n";

        }
        private closeButtonClick(event: egret.TouchEvent): void {
            this.closePanel(1);
        }*/
    }
}