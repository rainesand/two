module.exports = function (sequelize, DataTypes) {
    var Recent = sequelize.define("Recent", {
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

    Recent.associate = function(models) {
        Recent.belongsTo(models.User);
    };
    return Recent;
};