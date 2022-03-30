module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });

    return Comment;
};
