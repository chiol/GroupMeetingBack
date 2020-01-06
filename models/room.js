module.exports = (sequelize, DataTypes) => {
    return sequelize.define('room', 
    { 
        number: 
        { 
            type: DataTypes.DECIMAL(10, 2), 
            allowNull: false, 
        },
        leader:
        {
            type: DataTypes.STRING(20), 
            allowNull: false,
        },
        member1:
        {
            type: DataTypes.STRING(20), 
            allowNull: true,
        },
        member2:
        {
            type: DataTypes.STRING(20), 
            allowNull: true,
        },
        member3:
        {
            type: DataTypes.STRING(20), 
            allowNull: true,
        },
        allow:
        {
            type: DataTypes.JSON,
            allowNull: false,
        },
        state:
        {
            type:DataTypes.ENUM('recruit','ready','match'),
            allowNull: false,
            defaultValue: 'recruit'
        },
        gender:
        {
            type:DataTypes.ENUM("male","female"),
            allowNull: false
        },
        option:
        {
            type: DataTypes.STRING(20), 
            allowNull: true,
        },
        matchingId:
        {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    { 
        timestamps:true, 
    }); 
}
