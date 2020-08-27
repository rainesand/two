module.exports = function (sequelize, DataTypes) {
    var Discussion = sequelize.define("Discussion", {
        show: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        netflixID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {});

    Discussion.associate = function (models) {
        Discussion.hasMany(models.Post, {
            onDelete: "CASCADE"
        });
    };

    return Discussion;
}
