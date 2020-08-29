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
        imdb: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        userRate: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        netflixID: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});

    Show.associate = function(models) {
        Show.belongsTo(models.User);
    };
    return Show;
};