module.exports = function(sequelize, DataTypes) {
    const Countries = sequelize.define("Countries", {

      country_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 60]
        }
      },
      visited: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      population: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      region: {
          type: DataTypes.STRING,
          allowNull: false
      }
    }, {
        freezeTableName: true
    });
    return Countries;
};