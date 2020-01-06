module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', 
    { 
        useremail: 
        { 
            /* column 속성들 */ 
            type: DataTypes.STRING(20), 
            allowNull: false, 
            unique: true,
        }, 
        password: 
        { 
            type: DataTypes.STRING(100), 
            allowNull: false, 
        }, 
        name: 
        { 
            type: DataTypes.STRING(10), 
            allowNull: false,
            unique: true,
        },
        gender:
        {
            type: DataTypes.ENUM("male","female"),
            allowNull: false,

        }
    },
    { 
        timestamps:false, 
    }); 
}
