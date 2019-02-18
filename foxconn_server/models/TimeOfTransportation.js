//3D物流. 物料站点之间的运输平均耗时统计表
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('TimeOfTransportation', {
        ID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        StartStationNo: {//起始站点名称
            type: DataTypes.STRING(64),
            allowNull: false,
            defaultValue: 'default'
        },
        EndStationNo: {//结束站点名称
            type: DataTypes.STRING(64),
            allowNull: false,
            defaultValue: 'default'
        },
        FeedingEquipmentNo: {//送料装置编号
            type: DataTypes.STRING(64),
            allowNull: false,
            defaultValue: 'default'
        },
        MaterialName: {//物料名称
            type: DataTypes.STRING(64),
            allowNull: false,
            defaultValue: 'default'
        },
        TransferAvgTime: {//运输平均耗时
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },
        UpdateTime: {//记录更新时间戳
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    },{
        'freezeTableName': true,
        'timestamps': false,
        'tableName': 'TimeOfTransportation'
    }
    )
};