module.exports = (sequelize, DataTypes) => {
        const Comment = sequelize.define("comment", {
                users_id: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                },
                posts_id: {
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
