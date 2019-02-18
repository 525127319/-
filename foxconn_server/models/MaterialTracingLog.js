//3D物流. 物料追溯日志表  
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('MaterialTracingLog', {
        ID: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true
        },
        MaterialNo:{//物料编号
            type: DataTypes.STRING(64),
            allowNull: false,
            defaultValue: 'default'
        },
        MaterialName:{//物料名称
            type: DataTypes.STRING(64),
            allowNull: false,
            defaultValue: 'default'
        },
        Count:{//物料数量
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 0
        },
        StationType:{//站点类型, 测试、组装工站、上下料站点、仓库
            type: DataTypes.STRING(64),
            allowNull: false,
            defaultValue: 'default'
        },
        StationNo:{//站点编号
            type: DataTypes.STRING(64),
            allowNull: false,
            defaultValue: 'default'
        },
        MaterialEntryFlag:{//物料出入站标识, 0：物料出站；1：物料入站
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 0
        },
        MaterialEntryTime:{//物料出入站时间戳
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 0
        },
        UpdateTime:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    },{
        'freezeTableName': true,
        'timestamps': false,
        'tableName': 'MaterialTracingLog'
    })

}