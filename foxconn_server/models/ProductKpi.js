/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ProductKpi', {
      ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      LineName: {//线体名称
        type: DataTypes.STRING(64),
        allowNull: false
      },
      UPHKPI: {//uph-kpi
        type: DataTypes.INTEGER,
        allowNull: false
      },
      YieldNumberKPI: {//良品KPI
        type: DataTypes.INTEGER,
        allowNull: false
      },
      InferiorKPI: {//次品KPI
        type: DataTypes.INTEGER,
        allowNull: false
      },
      YieldKPI: {//良品率KPI
        type: DataTypes.FLOAT,
        allowNull: false
      },
      LineOncePassedKPI: {//线体一次通过率KPI
        type: DataTypes.FLOAT,
        allowNull: false
      },
      StationOncePassedKPI: {//工站一次通过率KPI
        type: DataTypes.FLOAT,
        allowNull: false
      } ,
      WorkstationYieldKPI: {//工位良品KPI
        type: DataTypes.INTEGER,
        allowNull: false
      } ,
      WorkstationInferiorKPI: {//工位次品KPI
        type: DataTypes.INTEGER,
        allowNull: false
      },
      UpdateTime: {//更新时间
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      } 
    }, {
      tableName: 'ProductKpi'
    });
  };
  