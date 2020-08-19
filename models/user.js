module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        user_name: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                len: [4, 12],
                notNull: true,
                isAlphanumeric: true,
                notEmpty: true
            }
        },
        first_name: {
            type: DataTypes.STRING,
            validate: {
                notNull: true,
                isAlphanumeric: true,
                notEmpty: true
            }
        },
        last_name: {
            type: DataTypes.STRING,
            validate: {
                notNull: true,
                isAlphanumeric: true,
                notEmpty: true
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