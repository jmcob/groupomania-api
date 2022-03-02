const db = require("../models");
const Comment = db.comment;

exports.new = async (req, res, next) => {
        await Comment.create({
                posts_id: req.body.posts_id,
                text: req.body.text,
                users_id: req.body.users_id,
        })
                .then((data) => res.status(201).json({ data }))
                .catch((error) => res.status(400).json({ error }));
};

exports.getAll = async (req, res, next) => {
        await Comment.findAll()
                .then((data) => res.status(200).json({ data }))
                .catch((error) => res.status(400).json({ error }));
};

exports.getOne = async (req, res, next) => {
        await Comment.findOne({ where: { id: req.params.id } })
                .then((data) => res.status(200).json({ data }))
                .catch((error) => res.status(400).json({ error }));
};

exports.delete = async (req, res, next) => {
        await Comment.destroy({ where: { id: req.params.id } })
                .then(() =>
                        res.status(200).json({ message: "Comment supprimé" })
                )
                .catch((error) => res.status(400).json({ error }));
};

exports.update = async (req, res, next) => {
        const updatedComment = await Comment.findOne({
                where: { id: req.params.id },
        });
        updatedComment.text = req.body.text;
        await updatedComment
                .save()
                .then((data) => res.status(200).json({ data }))
                .catch((error) => res.status(400).json({ error }));
};
