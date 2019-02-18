const fs = require('fs');
const Sequelize = require('sequelize');
var db = require('../config/db');
var path = require('path');
const store = db.getStore();
class Models{
    constructor(){
        var _p = path.join(__dirname, '../models');
        let files = fs.readdirSync(_p);
        let js_files = files.filter((f) => {
            return f.endsWith('.js');
        }, files);

        module.exports = {};

        for (let f of js_files) {
            console.log(`import model from file ${f}...`);
            if ('Models.js' == f || 'bundle.js' == f){//filter Models
                continue;
            }
            let name = f.substring(0, f.length - 3);
            module.exports[name] = require(__dirname + '/' + f)(store,Sequelize);
        }
    }
}

new Models();

module.exports.sync = () => {
    db.store.sync();
};


//module.exports = _a;