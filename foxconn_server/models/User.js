/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
      ID: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true
      },
      UserName: {
        type: DataTypes.STRING(32),
        allowNull: true
      },
      PassWord: {
        type: DataTypes.STRING(32),
        allowNull: true
      }
    }, {
      tableName: 'User'
    });
  };
  