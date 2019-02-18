const router = require('koa-router')();
const ProductController = require('./ProductController');

router.post('/product/getStatisticsData',ProductController.getStatisticsData)
router.post('/product/stationOncePassedRate',ProductController.stationOncePassedRate)
router.post('/product/testLogs',ProductController.testLogs)
router.post('/product/actionData',ProductController.actionData)
router.post('/product/stationStatus',ProductController.stationStatus)

module.exports = router;