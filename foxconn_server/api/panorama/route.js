var router = require('koa-router')();
var PanoramaController = require('./PanoramaController');

router.get('/panorama/loadStatusOfStation', PanoramaController.loadStatusOfStation); //查询全部下料点
router.get('/panorama/loadStatusOfStationByName/:name', PanoramaController.loadStatusOfStationByStatinNo); //查询全部下料点
router.get('/panorama/loadStatusOfFeeding/:name', PanoramaController.loadStatusOfFeeding); //查询运输记录
router.get('/panorama/loadTimeOfTransportation', PanoramaController.loadTimeOfTransportation); //查询平均耗时



module.exports = router;