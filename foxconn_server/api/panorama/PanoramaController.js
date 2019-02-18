let statusOfStationService = require('./StatusOfStationService');
let StatusOfFeedingService = require('./StatusOfFeedingService');
let timeOfTransportationService = require('./TimeOfTransportationService');
const logUtil = require('../../utils/LogUtil');


class PanoramaController {

    async loadStatusOfStation(ctx) { //查询每个下料点的信息
        ctx.body = await statusOfStationService.findAll();
    }

    async loadStatusOfStationByStatinNo(ctx) { //查询具体那个下料点的信息
        let params = ctx.params;
        let name = params.name;
        ctx.body = await statusOfStationService.findByCondition({StationNo: name});
    }

    async loadStatusOfFeeding(ctx) { //查询运料
        let params = ctx.params;
        let name = params.name;
        try {
            let rs = await StatusOfFeedingService.findLastByOption({TargetStationNo: name}, [['ID', 'DESC']], 1);
            ctx.body = rs;
        } catch (error) {
            logUtil.logErrorWithoutCxt(error);
        }
    }

    async loadTimeOfTransportation(ctx) { //查询平均耗时
        try {
            let rs = await timeOfTransportationService.findAll();
            ctx.body = rs;
        } catch (error) {
            logUtil.logErrorWithoutCxt(error);
        }
    }
}

module.exports = new PanoramaController();
