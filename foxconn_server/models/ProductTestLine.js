/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ProductTestLine', {
      ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      LineName: {//线体名称
        type: DataTypes.STRING(64),
        allowNull: false
      },
      FactoryName: {//工厂名称
        type: DataTypes.STRING(64),
        allowNull: false
      },
      WorkOrderNo: {//工单编号
        type: DataTypes.STRING(64),
        allowNull: false
      },
      ProductName: {//品名
        type: DataTypes.STRING(64),
        allowNull: false
      },
      IncoundCount: {//投产数量
        type: DataTypes.INTEGER,
        allowNull: false
      },
      OutCount: {//产出数量
        type: DataTypes.INTEGER,
        allowNull: false
      },
      LineOncePassedRate: {//一次通过率
        type: DataTypes.FLOAT,
        allowNull: false
      } ,
      YieldNumber: {//良品数
        type: DataTypes.INTEGER,
        allowNull: false
      } ,
      Yield: {//良品率
        type: DataTypes.FLOAT,
        allowNull: false
      },
      Uph: {//单位时间产出
        type: DataTypes.INTEGER,
        allowNull: false
      } ,
      UpdateTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      } 
    }, {
      tableName: 'ProductTestLine'
    });
  };
  