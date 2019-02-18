const energyRecord= require('./CurEnvRecord')
const energyStatic= require('./ConsumeStatistic')


class Mock {
    init(){
        energyRecord()
        energyStatic()
    }
}

let mock = new Mock();
mock.init()
module.exports=Mock
