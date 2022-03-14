const db = require("../models");
const Like = db.like;

exports.like = async (req, res, next) => {
    const alreadyLiked = await Like.findOne({
        where: { posts_id: req.body.post_id, users_id: req.body.user_id },
    });
    if (alreadyLiked) return alreadyLiked;
    await Like.create({
        posts_id: req.body.post_id,
        users_id: req.body.user_id,
    })
        .then((data) => res.status(201).json({ data }))
        .catch((error) => res.status(400).json({ error }));
};

exports.unlike = async (req, res, next) => {
    await Like.destroy({
        where: { id: req.params.id },
    })
        .then(() => res.status(200).json({ message: "like deleted" }))
        .catch((error) => res.status(400).json({ error }));
};

exports.counter = async (req, res, next) => {
    await Like.findAll({ where: { posts_id: req.params.id } })
        .then((data) => res.status(200).json({ data }))
        .catch((error) =>
            res.status(400).json({ message: "hi, this is an error" })
        );
};
