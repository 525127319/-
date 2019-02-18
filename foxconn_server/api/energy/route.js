const router = require('koa-router')();
const EnergyController = require('./EnergyController');

router.post('/environmentAndEnergy/realTimeDataQuery', EnergyController.findLast); //查询当前环境数据
router.post('/environmentAndEnergy/dataQueryForNearly24Hours', EnergyController.findOneDay); //查询过去24小时数据
router.post('/environmentAndEnergy/dataQueryForTheLastWeek', EnergyController.findWeek); // 查询过去一周的数据
router.post('/environmentAndEnergy/todayEnvironmentAndEnergyQuerying', EnergyController.electricitySum); // 查询今天的用电总和

module.exports = router;