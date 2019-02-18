const fs = require('fs');
const path = require('path');
const statusOfStationService = require('../../api/panorama/StatusOfStationService');
/**
 *BlankingPoint:下料点, 
 *"lessthan":  少于10时候，显视缺料。
 MaterialStatus: 0-无物料， 1-满料， 2-缺料

 初始化下料点， AGV的数据。
**/
class StatusOfStationMock{
    async init(){
        let obj = JSON.parse(fs.readFileSync(path.join(__dirname, './Configuration.json'), 'utf8'));
        let blankingPoints = obj.BlankingPoints;
        let agvs = obj.Agvs;
        let BeltBoxs = obj.BeltBoxs;
        let index = 1;
        try {
            await statusOfStationService.destroyByCondition({'ID': {$gte: 1}});
        } catch (error) {
            console.error(JSON.stringify(error));
        }

        //初始化天车
        //statusOfStationService.destroyByCondition({'StationName': {$like: '天车%'}});
        if (blankingPoints && blankingPoints.length >0){
            blankingPoints.forEach(element => {
                element.ID = index++; 
                //element.UpdateTime = TimeUtil.geCurUnixTime();
            });
            try {
                await statusOfStationService.bulkCreate(blankingPoints);
            } catch (error) {
                console.error(JSON.stringify(error));   
            }
        }

        //初始化AGV
        //statusOfStationService.destroyByCondition({'StationName': {$like: 'AGV1%'}});
        if (agvs && agvs.length > 0){
            agvs.forEach(avg=>{
                avg.ID = index++; 
                //avg.UpdateTime = TimeUtil.geCurUnixTime();
            });
            await statusOfStationService.bulkCreate(agvs);
        }

        //初始化皮带上的box
        //statusOfStationService.destroyByCondition({'StationName': {$like: 'Belt%'}});
        if(BeltBoxs && BeltBoxs.length > 0){
            BeltBoxs.forEach(beltBox => {
                beltBox.ID = index++;
               // beltBox.UpdateTime = TimeUtil.geCurUnixTime();
            });
            await statusOfStationService.bulkCreate(BeltBoxs);
        }

        setInterval(this.reduce.bind(this), 30000);

    }

    //模拟用料（减掉物料）
    async reduce(){
        let rs = await statusOfStationService.findAll();
        if (!rs || rs.length <= 0)return;
        rs.forEach(async (element)=>{
            if (element.StationName.indexOf('天车') < 0 || element.MaterialCount <= 0)return;
            await statusOfStationService.update({MaterialCount: 0, MaterialStatus: '无物料'}, {ID: element.ID});
        });
    }
}

let mock = new StatusOfStationMock();
//mock.init();
module.exports = mock;