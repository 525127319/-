const ProductActionLogService = require('./ProductActionLogService');
const ProductConfigurationService = require('./ProductConfigurationService');
const ProductKpiService = require('./ProductKpiService');
const ProductStationInfoService = require('./ProductStationInfoService');
const ProductTestLineService = require('./ProductTestLineService');
const ProductWorkstationLogService = require('./ProductWorkstationLogService');
const RSUtil = require('../../utils/RSUtil');
const LogUtil = require('../../utils/LogUtil');
const errorUtil = require('../../utils/ErrorUtil');


class ProductController {

    async getStatisticsData(ctx){
        try{
        let result= await ProductTestLineService.findAll()
            ctx.body = RSUtil.ok(result);
        }catch(error){
            errorUtil.responseError(ctx, error, "查找失败");
        }
    }

    async stationOncePassedRate(ctx){
        try{
            let result= await ProductStationInfoService.findAll()
                ctx.body = RSUtil.ok(result);
            }catch(error){
                errorUtil.responseError(ctx, error, "查找失败");
            }
    }
    async testLogs(ctx){
        try{
            let result= await ProductWorkstationLogService.findAll()
                ctx.body = RSUtil.ok(result);
            }catch(error){
                errorUtil.responseError(ctx, error, "查找失败");
            }
    }

    async actionData(ctx){
        try{
            let cell1 = await ProductActionLogService.findLastByOption({CellName:'Cell1'},[['UpdateTime', 'DESC']],1);
            let cell2 = await ProductActionLogService.findLastByOption({CellName:'Cell2'},[['UpdateTime', 'DESC']],1);
            let cell3 = await ProductActionLogService.findLastByOption({CellName:'Cell3'},[['UpdateTime', 'DESC']],1);
            let cell4 = await ProductActionLogService.findLastByOption({CellName:'Cell4'},[['UpdateTime', 'DESC']],1);
            let cell5 = await ProductActionLogService.findLastByOption({CellName:'Cell5'},[['UpdateTime', 'DESC']],1);
            let cell6 = await ProductActionLogService.findLastByOption({CellName:'Cell6'},[['UpdateTime', 'DESC']],1);

            let result = [cell1,cell2,cell3 ,cell4,cell5,cell6]
            ctx.body = RSUtil.ok(result);

        }catch(error){
            errorUtil.responseError(ctx, error, "查找失败");
        }
    }

    async stationStatus(ctx){
        try{
            let result= await ProductConfigurationService.findAll()
            ctx.body = RSUtil.ok(result);
        }
        catch(error){
            errorUtil.responseError(ctx, error, "查找失败");
        }
    }
    
}

module.exports=new ProductController()