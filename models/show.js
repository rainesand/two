var User = require("./user");
module.exports = function (sequelize, DataTypes) {
    var Show = sequelize.define("Show", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        summary: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        img: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {});

    Show.associate = function(models) {
        Show.belongsToMany(models.User,{
            through: "UserShows",
            foreignKey: {
                as: "userID",
                allowNull: false
            }
        });
    };
    return Show;
};