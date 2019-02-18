let timeOfTransportationService = require('../../api/panorama/TimeOfTransportationService');
let materialHouse = '原料仓', smtName = '板测线', assembler='组装线', 
    productionName = '成测线', packageLineName = '包装线', 
    finishedProductName = '成品仓'; 
let id = 1;
class TimeOfTransportationMock{
    async init(){
        await timeOfTransportationService.destroyByCondition({ID: {$gte: 0}});
       setInterval(this.updateData.bind(this), 10000);
    }

    async updateData(){
        let rs = await timeOfTransportationService.findByCondition({StartStationNo: materialHouse, EndStationNo: smtName});//原料仓-》板测线
        await this.upate(rs, materialHouse, smtName);
        rs = await timeOfTransportationService.findByCondition({StartStationNo: smtName, EndStationNo: assembler});//smt->组装线
        await this.upate(rs, smtName, assembler);
        rs = await timeOfTransportationService.findByCondition({StartStationNo: assembler, EndStationNo: productionName});//组装线->成测线
        await this.upate(rs, assembler, productionName);
        rs = await timeOfTransportationService.findByCondition({StartStationNo: productionName, EndStationNo: materialHouse});//成测线->原料仓
        await this.upate(rs, productionName, materialHouse);
        rs = await timeOfTransportationService.findByCondition({StartStationNo: materialHouse, EndStationNo: packageLineName});//原料仓->包装线
        await this.upate(rs, materialHouse, packageLineName);
        rs = await timeOfTransportationService.findByCondition({StartStationNo: packageLineName, EndStationNo: finishedProductName});//包装线->成品仓
        await this.upate(rs, packageLineName, finishedProductName);
    }

    async upate(rs, start, end){
        let time = Math.floor((Math.random()*10)+1);
        let obj = null;
        id++;
        if (rs && rs.length > 0){//更新
            try {
                timeOfTransportationService.update({TransferAvgTime: time}, {StartStationNo: start, EndStationNo: end});
            } catch (error) {
                console.error(JSON.stringify(error));
            }
        } else {//插入
            try {
                obj = await timeOfTransportationService.create({ID: id, StartStationNo: start, EndStationNo: end, FeedingEquipmentNo: 'FeedingEquipmentNo', MaterialName: 'Material', TransferAvgTime: time});
            } catch (error) {
                console.error(JSON.stringify(error));
            }
        }
    }
}

let mock = new TimeOfTransportationMock();
//mock.init();
module.exports = mock;