const db = require("../models");
const Post = db.post;

exports.new = async (req, res, next) => {
    const newPost = JSON.parse(req.body.post);
    if (req.file) {
        const post = await Post.create({
            ...newPost,
            image: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
            }`,
        });
        post.save()
            .then((data) => res.status(201).json({ data }))
            .catch((error) => res.status(400).json({ error }));
    } else {
        const post = await Post.create({
            ...newPost,
        });
        post.save()
            .then((data) => res.status(201).json({ data }))
            .catch((error) => res.status(400).json({ error }));
    }
};

exports.getAll = async (req, res, next) => {
    await Post.findAll({ limit: 10, order: [["createdAt", "DESC"]] })
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
    console.log(req.body.post);
    console.log(req.body);
    const reqPost = JSON.parse(req.body.post);
    if (reqPost.poster_id === reqPost.user_id || reqPost.admin === true) {
        const updatedPost = await Post.findOne({
            where: { id: req.params.id },
        });
        const filename = updatedPost.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, async () => {
            updatedPost.text = reqPost.text;
            (updatedPost.image = `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
            }`),
                await updatedPost
                    .save()
                    .then((data) => res.status(200).json({ data }))
                    .catch((error) => res.status(400).json({ error }));
        });
    }
};
