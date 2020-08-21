module.exports = function(sequelize, DataTypes) {
    var Login = sequelize.define("Login", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                len: [6, 20],
                notNull: true,
            }
        },
    });
    Login.associate = function(models) {
        Login.belongsTo(models.User,{
            foreignKey: {
                allowNull: false
            }
        });
    };
   return Login;
};