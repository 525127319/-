/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ProductConfiguration', {
      ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      LineName: {//线体
        type: DataTypes.STRING(64),
        allowNull: false
      },
      CellName: {//cell_name
        type: DataTypes.STRING(64),
        allowNull: false
      },
      StationCode: {//工站
        type: DataTypes.STRING(64),
        allowNull: false
      },
      WorkstationOrder: {//工位和界面绑定的顺序
        type: DataTypes.STRING(64),
        allowNull: false
      },
      StationID: {//工位名称
        type: DataTypes.STRING(64),
        allowNull: false
      },
      WorkstationStatus: {//工位状态
        type: DataTypes.INTEGER,
        allowNull: false
      },
      UpdateTime: {//更新时间
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      } 
    }, {
      tableName: 'ProductConfiguration'
    });
  };
  