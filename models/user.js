module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                len: [4, 12],
                notNull: true,
                isAlphanumeric: true,
            }
        },
        loggedIn: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

   return User;
};