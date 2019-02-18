const statusOfStationMock = require('./StatusOfStationMock');
const loadingMock = require('./LoadingMock');
const timeOfTransportationMock = require('./TimeOfTransportationMock');

class Mock{
    init(){
        statusOfStationMock.init();
        loadingMock.init();
        timeOfTransportationMock.init();
    }
}

let mock = new Mock();
mock.init();
module.exports = mock;