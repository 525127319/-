const productActionLog=require('./ProductActionLog')
const productConfiguration=require('./ProductConfiguration')
const productKpi=require('./ProductKpi')
const productStationInfo=require('./ProductStationInfo')
const productTestLine=require('./ProductTestLine')
const productWorkstationLog=require('./ProductWorkstationLog')

class Mock{
    init(){
        productActionLog()
        productConfiguration()
        productKpi()
        productStationInfo()
        productTestLine()
        productWorkstationLog()
    }
   
}

let mock = new Mock();
mock.init();
module.exports = mock;
