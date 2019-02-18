/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('SmtStationInfo', {
       ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      StationGroup: {//工站名称
        type: DataTypes.STRING(64),
        allowNull: false
      },
      StationOncePassedRate: {//一次通过率
        type: DataTypes.FLOAT,
        allowNull: false
      },
      UpdateTime: {//更新时间
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      } 
    }, {
      tableName: 'SmtStationInfo'
    });
  };
  