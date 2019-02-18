/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ProductWorkstationLog', {
      ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      WorkstationNo: {//箱子编号（工位编号）
        type: DataTypes.STRING(64),
        allowNull: false
      },
       CurStatus: {//当前状态
        type: DataTypes.STRING(64),
        allowNull: false
      },
      StationGroup: {//工站名称
        type: DataTypes.STRING(64),
        allowNull: false
      },
      TestType: {//测试类型 
        type: DataTypes.STRING(64),
        allowNull: false
      },
      TestCountTime: {//测试耗时
      type: DataTypes.FLOAT,
        allowNull: false
      },
      FinishedNum: {//完成数
        type: DataTypes.INTEGER,
        allowNull: false
      },
      YieldNumber: {//良品数
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Inferior: {//次品数
        type: DataTypes.INTEGER,
        allowNull: false
      } ,
      UpdateTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      } 
    }, {
      tableName: 'ProductWorkstationLog'
    });
  };
  