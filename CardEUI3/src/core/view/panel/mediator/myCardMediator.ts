/**
  * 背包面板
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class myCardMediator extends BaseMediator {
        public static NAME: string = "myCardMediator";

        public constructor(viewComponent: any = null) {
            super(myCardMediator.NAME,viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                "tocard" 
            ];
        }
        private myCardSkin: myCardSkin = new myCardSkin();
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch(notification.getName()) {
                case "tocard": {
                    //显示角色面板
                    var bodyData = notification.getBody();
                   var curdata = Data.cardsDesc.filter(function (item) {return item.cardname == bodyData; });
                    console.log("tocard", bodyData, "cc", curdata);
                    this.myCardSkin.setData(curdata[0]);
                    this.showUI(this.myCardSkin,false,0,0,5);
                    break;
                }
                case PanelNotify.CLOSE_MAP: {
                    //this.closePanel(1);
                    break;
                }
            }
        }       

        /**
         * 初始化面板ui
         */
        public initUI(): void {
            this.myCardSkin.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeButtonClick,this);
//            this.mapPanel.readExcel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.readExcelButtonClick,this);
            //this.mapPanel.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn1Click,this);
            //this.mapPanel.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn2Click,this);
            //this.mapPanel.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn3Click,this);
            //this.mapPanel.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn4Click,this);
           // this.mapPanel.btn5.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn5Click,this);
            //this.mapPanel.btn6.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn6Click,this);

            //TipsManager.addTips(this.mapPanel.img1,"没有动画tips！",0);
           // TipsManager.addTips(this.mapPanel.img2,"从下到上渐现",1);
            //TipsManager.addTips(this.mapPanel.img3,"从左向右",2);
            //TipsManager.addTips(this.mapPanel.img4,"从右向左",3);  
        }	

        private btn1Click(event: egret.TouchEvent): void {
            EffectUtils.showTips("从下到上弹出",1);
        }
        private btn2Click(event: egret.TouchEvent): void {
            EffectUtils.showTips("从左至右弹出",2); 
        }
        private btn3Click(event: egret.TouchEvent): void {
            EffectUtils.showTips("从右至左弹出",3);
        }
        private btn4Click(event: egret.TouchEvent): void {
            EffectUtils.showTips("从中间弹出渐渐消失",4); 
        }
        private btn5Click(event: egret.TouchEvent): void {
            EffectUtils.showTips("从大变小",5);   
        }
        private btn6Click(event: egret.TouchEvent): void {
            EffectUtils.showTips("警告字体颜色",5,true);
        }
        /**
         * 初始化面板数据
         */
        public initData(): void {


        }

        private readExcelButtonClick(event: egret.TouchEvent): void {

        }
        private closeButtonClick(event: egret.TouchEvent): void {
            this.closePanel(1);
        }
    }
}