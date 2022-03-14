const db = require("../models");
const Post = db.post;

exports.new = async (req, res, next) => {
    await Post.create({
        title: req.body.title,
        text: req.body.text,
        users_id: req.body.user_id,
    })
        .then((data) => res.status(201).json({ data }))
        .catch((error) => res.status(400).json({ error }));
};

exports.getAll = async (req, res, next) => {
    await Post.findAll({ limit: 7, order: [["createdAt", "DESC"]] })
        .then((data) => res.status(200).json({ data }))
        .catch((error) => res.status(400).json({ error }));
};

exports.getOne = async (req, res, next) => {
    await Post.findOne({ where: { id: req.params.id } })
        .then((data) => res.status(200).json({ data }))
        .catch((error) => res.status(400).json({ error }));
};

exports.delete = async (req, res, next) => {
    if (req.body.poster_id === req.body.user_id || req.body.admin === true) {
        await Post.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: "Post supprimé" }))
            .catch((error) => res.status(400).json({ error }));
    }
};

exports.update = async (req, res, next) => {
    if (req.body.poster_id === req.body.user_id || req.body.admin === true) {
        const updatedPost = await Post.findOne({
            where: { id: req.params.id },
        });
        updatedPost.text = req.body.text;
        await updatedPost
            .save()
            .then((data) => res.status(200).json({ data }))
            .catch((error) => res.status(400).json({ error }));
    }
};
