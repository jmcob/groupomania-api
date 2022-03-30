module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define("like", {
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Like;
};
