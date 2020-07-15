/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
    const Notes = sequelize.define("Notes", {

        note_title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        note_text: {
            type: DataTypes.TEXT,
            defaultValue: false
        },
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Notes;
};