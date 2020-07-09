module.exports = function(sequelize, DataTypes) {
    const Countries = sequelize.define("Countries", {

      country_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 60]
        }
      },
      desired: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
      },
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Countries;
};