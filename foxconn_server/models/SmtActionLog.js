/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('SmtActionLog', {
       ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      LineName: {//线体名称
        type: DataTypes.STRING(64),
        allowNull: false
      },
      MaterialNo: {//物料编号
        type: DataTypes.STRING(64),
        allowNull: false
      },
      MaterialName: {//物料名称
        type: DataTypes.STRING(64),
        allowNull: false
      },
      StartStationNo: {//物料原始位置编号
        type: DataTypes.STRING(64),
        allowNull: false
      },
      TargetStationNo: {//目标位置编号
        type: DataTypes.STRING(64),
        allowNull: false
      },
      CellName: {//cell_name
        type: DataTypes.STRING(64),
        allowNull: false
      },
      Result: {//测试结果
        type: DataTypes.INTEGER,
        allowNull: false
      } ,
      UpdateTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      } 
    }, {
      tableName: 'SmtActionLog'
    });
  };
  