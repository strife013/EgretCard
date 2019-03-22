var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CollisionUtils;
(function (CollisionUtils) {
    //===================================================碰撞检测核心代码部分==================================================
    //实现比较简单，除去注释部分，其实只有二十几行代码
    //参数依次为： 碰撞点，碰撞多边形的坐标，碰撞多边形各个顶点坐标(多边形的局部坐标系内，传进来的顶点数组必须为凸多边形的顺时针序列顶点)
    //source仅用x,y
    function checkhit(source, target) {
        var overlap = false;
        //相距距离
        var maxRange = 40;
        //覆盖判断
        var zx1_x = source.x + source.width * source.scaleX / 2;
        var zx1_y = source.y + source.height * source.scaleY / 2;
        var zx2_x = target.x + target.width * target.scaleX / 2;
        var zx2_y = target.y + target.height * target.scaleY / 2;
        // console.log("hittest:", zx1_x, zx1_y, zx2_x, zx2_y);
        var calX = zx1_x - zx2_x;
        var calY = zx1_y - zx2_y;
        var distance = Math.pow((calX * calX + calY * calY), 0.5);
        if (distance < maxRange)
            overlap = true;
        return overlap;
    }
    CollisionUtils.checkhit = checkhit;
    //获取随机排列,一共datacount个数，顺序0123...对应res
    function getRandomCardIndex(dataCount) {
        var arr = [];
        for (var i = 0; i < dataCount; i++) {
            arr[i] = i;
        }
        arr.sort(function () { return 0.5 - Math.random(); });
        return arr;
    }
    CollisionUtils.getRandomCardIndex = getRandomCardIndex;
})(CollisionUtils || (CollisionUtils = {}));
var card = (function (_super) {
    __extends(card, _super);
    function card(name, index) {
        var _this = _super.call(this) || this;
        _this.autoTargetAnchor = 0;
        _this.isManualMove = false;
        _this._name = name;
        _this._index = index;
        _this.init();
        return _this;
    }
    Object.defineProperty(card.prototype, "SetState", {
        set: function (state) {
            //状态变化
            this._state = state;
        },
        enumerable: true,
        configurable: true
    });
    card.prototype.init = function () {
        this.setCardShadowIndex = -1;
        this._card = new egret.Bitmap();
        this.screenH = Data.stage.height;
        this.screenW = Data.stage.width;
        this._card.texture = RES.getRes("backpic_png");
        //this._balloon.y = Math.random() * 100; 
        this._text = new egret.TextField();
        //  this._text.text = this.getFlyWords(); 
        this._card.scaleX = 0.5;
        this._card.scaleY = 0.5;
        this.scaleX = 0.5;
        this.scaleY = 0.5;
        this.width = this._card.width * this._card.scaleX;
        this.height = this._card.height * this._card.scaleY;
        //this._card.height = 10;
        this._card.touchEnabled = true;
        this._card.x = 0;
        this._card.y = 0;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.moveBegin, this);
        Data.IsOnDrag = true;
        this._detail = new cardDetail(this._name, this._index);
        this.addChild(this._card);
        this.addChild(this._text);
        //this.anchorOffsetX = this.width * this.scaleX / 2;
        //this.anchorOffsetY = this.height * this.scaleY / 2;
        //test
        // this.touchEnabled=true;
        //this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.backToFont,this);
    };
    //转向背面
    card.prototype.ToBack = function () {
        this._card.texture = RES.getRes("backpic_png");
    };
    //到一个固定地方
    card.prototype.toFixPosition = function () {
        var tw = egret.Tween.get(this);
        var placeY = 100;
        //卡牌 旋转到固定位置
        var targetAnchor = 360 * 1;
        var placeX = this.anchorOffsetX * this.scaleX + 10;
        placeX += this.indexorder * 2;
        var moveToPlace = { x: placeX, y: placeY, rotation: targetAnchor, scaleX: 0.5, scaleY: 0.5 };
        tw.to(moveToPlace, 500); //可位移的对象
    };
    //卡牌转向正面
    card.prototype.backToFont = function (e) {
        //todo why 会位移？
        this.anchorOffsetX = this.width * this.scaleX / 2;
        this.x = this.x + this.anchorOffsetX * this.scaleX;
        //this.anchorOffsetY = this.height * this.scaleY / 2;
        var tw = egret.Tween.get(this);
        tw.to({ scaleX: 0 }, 1000);
        var self = this;
        tw.call(function () {
            self._card.texture = RES.getRes(self._name);
        });
        tw.to({ scaleX: 0.5 }, 1000);
        tw.call(function () {
            //展示carddetail  
            EffectUtils.removeScaleEffect(self);
            self.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.backToFont, self);
            // self.addEventListener(egret.TouchEvent.TOUCH_TAP, self.showDetailInfo, self);
            // self._detail.touchEnabled = true;
            self.showDetailInfo();
        });
    };
    //todo
    card.prototype.showDetailInfo = function () {
        //显示Data.showCardDetail
        Data.CardShadows[this.setCardShadowIndex].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showDetailInfo, this);
        //this._detail.showInfo(this);
        //替换Data.showCardDetail 内容
        game.AppFacade.getInstance().sendNotification("tocard", this._name);
    };
    ///跟随鼠标洗牌
    card.prototype.rotationCardWithTap = function () {
    };
    card.prototype.rotationCardByPoint = function (p) {
        if (!this.isManualMove) {
            this.isManualMove = true;
            var tw = egret.Tween.get(this);
            var xdata = this.x;
            var ydata = this.y;
            if (this.x > p.x) {
                xdata -= Math.random() * 30 + this.indexorder * 2;
            }
            else {
                xdata += Math.random() * 30 + this.indexorder * 2;
            }
            if (this.y > p.y) {
                ydata -= Math.random() * 30 + this.indexorder * 2;
            }
            else {
                ydata += Math.random() * 30 + this.indexorder * 2;
            }
            var fixedAnchor = 5 * this.indexorder + 100;
            this.autoTargetAnchor = this.rotation + fixedAnchor;
            var moveAction1 = { x: xdata, y: ydata, rotation: this.autoTargetAnchor };
            var self = this;
            tw.to(moveAction1, 200); //可位移的对象
            tw.call(function () {
                self.isManualMove = false;
            });
        }
    };
    card.prototype.toPosition = function (moveAction, time) {
        var tw = egret.Tween.get(this);
        tw.to(moveAction, time);
    };
    card.prototype.toSlicePosition = function () {
        var self = this;
        var placeX = self.anchorOffsetX * self.scaleX + Data.stage.stageWidth / 2 - 30;
        var cardnumber = 5;
        var placeY = 100 + Data.stage.stageHeight * 1 / 5;
        if (self.indexorder < cardnumber / 3)
            placeY = 100 + Data.stage.stageHeight * 1 / 5;
        else if (self.indexorder > cardnumber * 2 / 3)
            placeY = 300 + Data.stage.stageHeight * 1 / 5;
        else
            placeY = 200 + Data.stage.stageHeight * 1 / 5;
        var moveAction = { x: placeX, y: placeY };
        var tw = egret.Tween.get(this);
        tw.to(moveAction, 500);
    };
    ///到选择卡牌时位置
    card.prototype.toPickPosition = function () {
        var targetAnchor = 360;
        var cardnumber = Data.cardsDesc.length;
        var angleRange = 120;
        var cardw = 85;
        var R = 100;
        var self = this;
        //todo 洗牌结果 self.indexorder 
        var sita = angleRange / 2 - (angleRange / cardnumber * self.indexorder - 1);
        var sitaPa = sita / 180 * Math.PI;
        var targetx = Data.stage.stageWidth / 2 - Math.sin(sitaPa) * R - Math.cos(sitaPa) * cardw / 2;
        var targety = Math.cos(sitaPa) * R - Math.sin(sitaPa) * cardw / 2;
        targetAnchor += sita;
        var moveToPlace = { x: targetx, y: targety, rotation: targetAnchor, scaleX: 0.5, scaleY: 0.5 };
        var tw = egret.Tween.get(this);
        tw.to(moveToPlace, 1000); //可位移的对象
        self._card.touchEnabled = true;
    };
    ///设置滚动轨迹
    card.prototype.setRotationPointValue = function () {
        this.point0 = new egret.Point();
        this.point1 = new egret.Point();
        this.point2 = new egret.Point();
        this.point0.x = this.x;
        this.point0.y = this.y;
        //console.log("setin",this.iniIndex,"point0:x:",this.point0.x,"point0:y:",this.point0.y)
        this.point1.x = Math.random() * Data.getStageW(); //*2/3;
        this.point1.y = Math.random() * Data.getStageH() * 2 / 3;
        this.point2.x = Math.random() * Data.getStageW(); //* 2 / 3;
        this.point2.y = Math.random() * Data.getStageH() * 2 / 3;
        var tempMaxPoint = new egret.Point();
        tempMaxPoint.x = Data.getStageW() * 2 / 3;
        tempMaxPoint.y = Data.getStageH() * 2 / 3;
        var distanceNumber = egret.Point.distance(this.point0, this.point2);
        var maxDistance = egret.Point.distance(this.point0, tempMaxPoint);
        this.rotationSeconds = distanceNumber / maxDistance * 5;
        if (this.rotationSeconds > Data.MaxRotationSecond) {
            Data.MaxRotationSecond = this.rotationSeconds;
        }
    };
    Object.defineProperty(card.prototype, "factor", {
        get: function () {
            return 0;
        },
        //P0点是(100,100)，P1点是(300,300)，P2点是(100,500)。
        set: function (value) {
            // this.x = (1 - value) * (1 - value) * 100 + 2 * value * (1 - value) * 300 + value * value * 100;
            // this.y = (1 - value) * (1 - value) * 100 + 2 * value * (1 - value) * 300 + value * value * 500;
            this.x = (1 - value) * (1 - value) * this.point0.x + 2 * value * (1 - value) * this.point1.x + value * value * this.point2.x;
            this.y = (1 - value) * (1 - value) * this.point0.y + 2 * value * (1 - value) * this.point1.y + value * value * this.point2.y;
        },
        enumerable: true,
        configurable: true
    });
    //自动洗牌
    //初始化洗牌
    //随机旋转时间，随机轨迹
    card.prototype.rotationCard = function (indexorder) {
        this.anchorOffsetX = this.width * this.scaleX / 2;
        //重设偏移
        this.x = this.x + this.anchorOffsetX * this.scaleX;
        this.anchorOffsetY = this.height * this.scaleY / 2;
        this.y = this.y + this.anchorOffsetY * this.scaleY;
        this.point0.x = this.x;
        this.point0.y = this.y;
        //todo
        //this.anchorOffsetX = this.width / 2;
        //this.anchorOffsetY = this.height / 2;
        this.indexorder = indexorder;
        var tw = egret.Tween.get(this);
        var targetAnchor = 0;
        var loopCount = 0;
        var self = this;
        var rotation2 = function () {
            var intSecond = Math.round(self.rotationSeconds);
            if (intSecond <= 0)
                intSecond = 1;
            targetAnchor += 360 * intSecond * 2 + Math.random() * 200;
            tw.to({ factor: 1, rotation: targetAnchor, scaleX: 0.5, scaleY: 0.5 }, self.rotationSeconds * 1000);
        };
        var rotation1 = function () {
            targetAnchor += 360 * 1;
            var placeX = self.anchorOffsetX * self.scaleX + Data.stage.stageWidth / 2 - 30;
            var placeY = self.indexorder * 2 + Data.stage.stageHeight * 1 / 5;
            var xdata = placeX + Math.random() * 60;
            var ydata = placeY + Math.random() * 80;
            var moveAction1 = { x: xdata, y: ydata, alpha: 1, rotation: targetAnchor, scaleX: 0.5, scaleY: 0.5 };
            targetAnchor += 360 * 1;
            var xdata2 = placeX + Math.random() * 60;
            var ydata2 = placeY + Math.random() * 80;
            var moveAction2 = { x: xdata2, y: ydata2, alpha: 1, rotation: targetAnchor, scaleX: 0.5, scaleY: 0.5 };
            var xdata3 = placeX + Math.random() * 60;
            var ydata3 = placeY + Math.random() * 80;
            targetAnchor += 360 * 1;
            var moveAction3 = { x: xdata3, y: ydata3, alpha: 1, rotation: targetAnchor, scaleX: 0.5, scaleY: 0.5 };
            //卡牌 旋转到固定位置
            targetAnchor += 360 + 90;
            var cardnumber = 5;
            var angleRange = 120;
            var cardw = 85;
            var R = 100;
            //todo 洗牌结果 self.indexorder 
            var sita = angleRange / 2 - (angleRange / cardnumber * self.indexorder - 1);
            var sitaPa = sita / 180 * Math.PI;
            var targetx = Data.stage.stageWidth / 2 - Math.sin(sitaPa) * R - Math.cos(sitaPa) * cardw / 2;
            var targety = Math.cos(sitaPa) * R - Math.sin(sitaPa) * cardw / 2;
            // targetAnchor += sita;
            //console.log("index:" + self.indexorder,"sita:" + sita,"sitaPa:" + sitaPa,"tx:" + targetx,"ty:" + targety);
            var moveToPlace = { x: placeX, y: placeY, rotation: targetAnchor, scaleX: 0.5, scaleY: 0.5 };
            // var moveToPlace = { x: targetx,y: targety, rotation: targetAnchor, scaleX: 0.5, scaleY: 0.5 };
            tw.to(moveAction1, 500).to(moveAction2, 500).to(moveAction3, 500).to(moveToPlace, 500); //可位移的对象
            self._card.touchEnabled = true;
            ///shadow位置重置初始化
            Data.CardShadows.forEach(function (v, i) {
                if (v.hasCard) {
                    v.hasCard = false;
                    v.removeEventListener(egret.TouchEvent.TOUCH_TAP, v.card.showDetailInfo, v.card);
                }
            });
        };
        rotation2();
    };
    card.prototype.moveBegin = function (evt) {
        console.log("moveBegin");
        Data.CurCard = this;
        Data.CurCard.prex = Data.CurCard.x;
        Data.CurCard.prey = Data.CurCard.y;
        Data.CurCard.xs = evt.stageX - Data.CurCard.x;
        Data.CurCard.ys = evt.stageY - Data.CurCard.y;
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, Data.CurCard.move, this);
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, Data.CurCard.endmove, this);
    };
    card.prototype.Blink = function () {
        EffectUtils.playScaleEffect(this, { x: 0.5, y: 0.5 }, { x: 0.6, y: 0.6 });
        //  EffectUtils.rotationEffect(this,2);
    };
    card.prototype.endmove = function (e) {
        //回到之前位置
        if (this.setCardShadowIndex < 0) {
            var twb = egret.Tween.get(this);
            var twpos = { y: Data.CurCard.prey, x: Data.CurCard.prex };
            twb.to(twpos, 500, egret.Ease.cubicOut);
        }
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, Data.CurCard.move, this);
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, Data.CurCard.endmove, this);
    };
    card.prototype.move = function (e) {
        var isWin = false;
        Data.CurCard.x = e.stageX - Data.CurCard.xs;
        Data.CurCard.y = e.stageY - Data.CurCard.ys;
        if (Data.CardShadows && Data.CardShadows.length > 0) {
            Data.CardShadows.forEach(function (v, i) {
                if (!v.hasCard) {
                    var isoverlap = CollisionUtils.checkhit(Data.CurCard, v);
                    if (isoverlap) {
                        //todo 拖动卡牌消失，当前shadow填充
                        Data.CurCard.x = v.x + Data.CurCard.anchorOffsetX * Data.CurCard.scaleX;
                        Data.CurCard.y = v.y + Data.CurCard.anchorOffsetY * Data.CurCard.scaleY;
                        Data.CurCard.rotation = 0;
                        Data.CurCard.touchEnabled = false;
                        Data.CurCard._card.touchEnabled = false;
                        v.hasCard = true;
                        v.touchEnabled = true;
                        //Data.CurCard.addEventListener(egret.TouchEvent.TOUCH_TAP, Data.CurCard.backToFont,Data.CurCard);
                        Data.CurCard.setCardShadowIndex = i;
                        Data.CurCard.endmove(null);
                        // Data.selectCardIndex = i;
                        v.card = Data.CurCard;
                        game.AppFacade.getInstance().sendNotification("topickcard");
                    }
                }
            });
        }
    };
    card.prototype.fall = function (e) {
        //todo 掉落動畫
    };
    ///获取气球上随机的话语
    card.prototype.getFlyWords = function () {
    };
    return card;
}(egret.DisplayObjectContainer));
__reflect(card.prototype, "card");
//# sourceMappingURL=card.js.map