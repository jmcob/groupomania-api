module.exports = (sequelize, DataTypes) => {
        const Like = sequelize.define("like", {
                posts_id: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                },
                users_id: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                },
        });

        return Like;
};
