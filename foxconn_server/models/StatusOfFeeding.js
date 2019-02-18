//3D物流. 送料装置的物料状态表
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('StatusOfFeeding', {
        ID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        FeedingEquipmentNo:{//送料装置编号
            type: DataTypes.STRING(64),
            allowNull: false,
            defaultValue: 'default'
        },
        TargetStationNo:{//目标物料站点编号
            type: DataTypes.STRING(64),
            allowNull: false,
            defaultValue: 'default'
        },
        MaterialName:{//物料名称
            type: DataTypes.STRING(64),
            allowNull: false,
            defaultValue: 'default'
        }, 
        MaterialCount:{//物料数量
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 0
        },
        StartStationNo:{//起始物料站点编号
            type: DataTypes.STRING(64),
            allowNull: false,
            defaultValue: 'default'
        }, 
        UpdateTime:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    },{
        'freezeTableName': true,
        'timestamps': false,
        'tableName': 'StatusOfFeeding'
    })
};