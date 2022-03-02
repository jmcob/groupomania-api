const { post } = require("../models");
const db = require("../models");
const Like = db.like;

exports.like = async (req, res, next) => {
        await Like.create({
                postId: req.body.postId,
                user_id: req.body.user_id,
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
