class Equipment{
    constructor(_machine){
        this.machine = _machine;
    }

    rotationY(message, direction){
        this.machine.rotationY(message, direction);
    }

    rotationZ(message, direction){
        this.machine.rotationZ(message, direction);
    }

    positionY(position, orientation){
        this.machine.positionY(position, orientation);
    }


    toLoadRail1(metatrial, _t, callback){
        this.rotationY({angle: _t.angle, action: _t.event});
        this.positionY({position: 10}, -1);
        const _this = this;
         setTimeout(() => {//做一个取料动作
             _this.positionY({position: 30}, 1);
             metatrial.reduce();
             if (callback)
                callback();
            // this.moveToTester();
         }, 800);
    }

    toLoadRail2(metatrial, _t, callback){
        this.rotationY({angle: _t.angle, action: _t.event});
        this.positionY({position: 10}, -1);
        const _this = this;
         setTimeout(() => {//做一个取料动作
             _this.positionY({position: 30}, 1);
             metatrial.reduce();
             if (callback)
                callback();
             //this.moveToTester();
         }, 300);
    }

}

export default Equipment;