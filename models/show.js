var User = require("./user");
module.exports = function (sequelize, DataTypes) {
    var Show = sequelize.define("Show", {
        title: {
            type: DataTypes.STRING
        },
        summary: {
            type: DataTypes.STRING
        },
        imdb: {
            type: DataTypes.FLOAT
        },
        userRate: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.STRING
        },
        img: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        year: {
            type: DataTypes.INTEGER
        }
    }, {});

    Show.associate = function(models) {
        Show.belongsTo(models.User);
    };
    return Show;
};