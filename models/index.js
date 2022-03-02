const dotenv = require("dotenv").config();

// connection

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
        process.env.DB,
        process.env.DB_USER,
        process.env.DB_PWD,
        {
                host: "localhost",
                dialect: "mysql",
        }
);

// db

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// tables (models)

db.user = require("./user.model.js")(sequelize, Sequelize);
db.post = require("./post.model.js")(sequelize, Sequelize);
db.comment = require("./comment.model.js")(sequelize, Sequelize);
db.like = require("./like.model.js")(sequelize, Sequelize);

// foreign keys

// db.user.hasMany(db.post, {
//         foreignKey: "userId",
//         onDelete: "CASCADE",
//         onUpdate: "CASCADE",
//         as: "post",
// });
// db.post.belongsTo(db.user, { foreignKey: "userId", as: "user" });

// db.post.hasMany(db.comment, {
//         foreignKey: "postId",
//         onDelete: "CASCADE",
//         onUpdate: "CASCADE",
//         as: "comment",
// });
// db.comment.belongsTo(db.post, { foreignKey: "postId", as: "post" });

// db.user.hasMany(db.comment, {
//         foreignKey: "userId",
//         onDelete: "CASCADE",
//         onUpdate: "CASCADE",
//         as: "comment",
// });
// db.comment.belongsTo(db.user, { foreignKey: "userId", as: "user" });

// db.post.hasMany(db.like, {
//         foreignKey: "postId",
//         onDelete: "CASCADE",
//         onUpdate: "CASCADE",
//         as: "like",
// });
// db.like.belongsTo(db.post, { foreignKey: "postId", as: "post" });

// db.user.hasMany(db.like, {
//         foreignKey: "userId",
//         onDelete: "CASCADE",
//         onUpdate: "CASCADE",
//         as: "like",
// });
// db.like.belongsTo(db.post, { foreignKey: "userId", as: "user" });

module.exports = db;
