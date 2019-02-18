const SmtActionLogService = require('./SmtActionLogService');
const SmtConfigurationService = require('./SmtConfigurationService');
const SmtKpiService = require('./SmtKpiService');
const SmtStationInfoService = require('./SmtStationInfoService');
const SmtTestLineService = require('./SmtTestLineService');
const SmtWorkstationLogService = require('./SmtWorkstationLogService');
const RSUtil = require('../../utils/RSUtil');
const LogUtil = require('../../utils/LogUtil');
const errorUtil = require('../../utils/ErrorUtil');

class SmtController{

    async getStatisticsData(ctx){
        try{
            let result= await SmtTestLineService.findAll()
            ctx.body = RSUtil.ok(result);
        }catch(error){
            errorUtil.responseError(ctx, error, "查找失败");
        }
    }

    async stationOncePassedRate(ctx){
        try{
            let result= await SmtStationInfoService.findAll()
            ctx.body = RSUtil.ok(result);
        }catch(error){
            errorUtil.responseError(ctx, error, "查找失败");
        }
    }

    async testLogs(ctx){
        try{
            let result= await SmtWorkstationLogService.findAll()
            ctx.body = RSUtil.ok(result);
        }catch(error){
            errorUtil.responseError(ctx, error, "查找失败");
        }
    }

    async actionData(ctx){
        try{
            let cell1 = await SmtActionLogService.findLastByOption({CellName:'Cell1'},[['UpdateTime', 'DESC']],1);
            let cell2 = await SmtActionLogService.findLastByOption({CellName:'Cell2'},[['UpdateTime', 'DESC']],1);
            let cell3 = await SmtActionLogService.findLastByOption({CellName:'Cell3'},[['UpdateTime', 'DESC']],1);
            let result = [cell1,cell2,cell3]
            ctx.body = RSUtil.ok(result);
        }catch(error){
            errorUtil.responseError(ctx, error, "查找失败");
        }
    }

    async stationStatus(ctx){
        try{
            let result= await SmtConfigurationService.findAll()
            ctx.body = RSUtil.ok(result);
        }
        catch(error){
            errorUtil.responseError(ctx, error, "查找失败");
        }
    }

   
}

module.exports=new SmtController()