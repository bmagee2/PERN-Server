// DEFINE DATA WE WANT TO STORE, WILL MIRROR TABLE IN DB

module.exports = (sequelize, DataTypes) => {
    const Monologue = sequelize.define('monologue', {
        playTitle: {
            type: DataTypes.STRING,
            allowNull: true
        },
        characterName: {
            type: DataTypes.STRING,
            allowNull: true 
        },
        category: {
            type: DataTypes.ENUM,
            values: ['Classical', 'Contemporary', 'Shakespearean'],
            // type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.ENUM,
            values: ['Drama', 'Comedy'],
            // type: DataTypes.STRING,
            allowNull: true
        },
        sceneSynopsis: {
            type: DataTypes.TEXT,
            allowNull: true 
        },
        monologue: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allownull: false
        }

    })
    return Monologue;
}