const router = require('koa-router')();
const SmtController = require('./SmtController');

router.post('/smt/getStatisticsData',SmtController.getStatisticsData)
router.post('/smt/stationOncePassedRate',SmtController.stationOncePassedRate)
router.post('/smt/testLogs',SmtController.testLogs)
router.post('/smt/actionData',SmtController.actionData)
router.post('/smt/stationStatus',SmtController.stationStatus)


module.exports = router;