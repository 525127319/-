const smtActionLog=require('./SmtActionLog.js')
const smtConfiguration=require('./SmtConfiguration')
const smtKpi=require('./SmtKpi')
const smtStationInfo=require('./SmtStationInfo')
const smtTestLine=require('./SmtTestLine')
const smtWorkstationLog=require('./SmtWorkstationLog')

class Mock{
    init(){
        smtActionLog();
        smtConfiguration();
        smtKpi();
        smtStationInfo();
        smtTestLine();
        smtWorkstationLog();
    }
}

let mock = new Mock();
mock.init()
module.exports=Mock