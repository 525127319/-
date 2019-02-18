const EnergyService = require('./EnergyService');
const EnergyStasticService = require('./EnergyStasticService');
const RSUtil = require('../../utils/RSUtil');
const errorUtil = require('../../utils/ErrorUtil');

class EnergyController {
    async findLast(ctx) { //查询当前环境数据
   
        try {
            let type0 = await EnergyService.findLastByOption({Type:0},[['UpdateTime', 'DESC']],1);
            let type1 = await EnergyService.findLastByOption({Type:1},[['UpdateTime', 'DESC']],1);
            let type2 = await EnergyService.findLastByOption({Type:2},[['UpdateTime', 'DESC']],1);
            let type3 = await EnergyService.findLastByOption({Type:3},[['UpdateTime', 'DESC']],1);
            let result = [type0,type1,type2 ,type3]
            ctx.body = RSUtil.ok(result);
            
        } catch (error) {
            errorUtil.responseError(ctx, error, "查找失败");
        }
    }
    async findOneDay(ctx){ //查询过去一天的数据
        try {
            let electric = await EnergyService.findLastByOption({Type:4},[['UpdateTime', 'DESC']],240);
            let gas = await EnergyService.findLastByOption({Type:5},[['UpdateTime', 'DESC']],240);
            let result=[electric,gas]
            ctx.body = RSUtil.ok(result);
            
        } catch (error) {
            errorUtil.responseError(ctx, error, "查找失败");
        }
    }
    async findWeek(ctx){ // 查询过去一周的数据
        try {
            let result = await EnergyStasticService.findLastByOption({ID:{$gt:0}},[['UpdateTime', 'DESC']],7);
            ctx.body = RSUtil.ok(result);
            
        } catch (error) {
            errorUtil.responseError(ctx, error, "查找失败");
        }
    }

    async electricitySum(ctx){ // 查询今天的用电总和
        let date=new Date()
 
        try {
            let type0 = await EnergyService.average('Value',{Type:0,UpdateTime:{$gte:date}});
            let type1 = await EnergyService.average('Value',{Type:1,UpdateTime:{$gte:date}});
            let type2 = await EnergyService.average('Value',{Type:2,UpdateTime:{$gte:date}});
            let type3 = await EnergyService.average('Value',{Type:3,UpdateTime:{$gte:date}});
            let type4 = await EnergyService.sum('Value',{Type:4,UpdateTime:{$gte:date}});
            let type5 = await EnergyService.sum('Value',{Type:5,UpdateTime:{$gte:date}});
            let result=[type0,type1,type2,type3,type4,type5]
            ctx.body = RSUtil.ok(result);

        } catch (error) {
            errorUtil.responseError(ctx, error, "查找失败");
        }
    }
}

module.exports = new EnergyController();

 