module.exports = (sequelize, DataTypes) => {
        const Post = sequelize.define("post", {
                users_id: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                },
                title: {
                        type: DataTypes.STRING,
                        allowNull: false,
                },
                text: {
                        type: DataTypes.TEXT,
                        allowNull: false,
                },
                image: {
                        type: DataTypes.STRING,
                        allowNull: true,
                },
        });

        return Post;
};
