module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [2]
        },
        spoiler: {
            type: DataTypes.BOOLEAN,
            defaultValue: '0'
        },
        netflixID: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Post.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint

        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });


    };

    return Post;
};
