// DEFINE DATA WE WANT TO STORE, WILL MIRROR TABLE IN DB

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('user', {

        email: {
            type: DataTypes.STRING,
            required: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return User;
}

