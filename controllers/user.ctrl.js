const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");
const db = require("../models");
const User = db.user;
const fs = require("fs");

// User signup controller
exports.signup = (req, res, next) => {
    const isValidateEmail = validator.validate(req.body.email);
    if (!isValidateEmail) {
        res.writeHead(400, 'Email incorrect !"}', {
            "content-type": "application/json",
        });
        res.end("Le format de l'email est incorrect.");
    } else {
        bcrypt
            .hash(req.body.password, 10)
            .then((hash) => {
                console.log(hash);
                User.create({
                    email: req.body.email,
                    username: req.body.username,
                    password: hash,
                    admin: false,
                    avatar: "http://localhost:3000/images/public/avatar/sun.png",
                })
                    .then((data) =>
                        res.status(201).json({
                            message: "Utilisateur créé !",
                            data,
                        })
                    )
                    .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(500).json({ error }));
    }
};

// user login controller

exports.login = async (req, res, next) => {
    const userToLog = await User.findOne({
        where: { email: req.body.email },
    });
    const user_id = userToLog.id;
    const admin = userToLog.admin;
    const passwordHash = userToLog.password;

    function login() {
        try {
            if (!user_id) {
                return res.status(401).json({
                    error: "Utilisateur non trouvé !",
                });
            } else {
                bcrypt.compare(
                    req.body.password,
                    passwordHash,
                    function (err, correct) {
                        if (err) throw err;
                        if (!correct) {
                            return res.status(401).json({
                                error: "Mot de passe incorrect !",
                            });
                        } else {
                            return res.status(200).json({
                                user_id: user_id,
                                token: jwt.sign(
                                    {
                                        user_id: user_id,
                                        admin: admin,
                                    },
                                    process.env.JWT,
                                    {
                                        expiresIn: "96h",
                                    }
                                ),
                            });
                        }
                    }
                );
            }
        } catch (error) {
            return res.status(500).send({ error });
        }
    }
    login();
};

exports.getOne = async (req, res, next) => {
    await User.findOne({ where: { id: req.params.id } })
        .then((data) => res.status(200).json({ data }))
        .catch((error) => res.status(400).json({ error }));
};

exports.updateOne = async (req, res, next) => {
    const updatedUser = JSON.parse(req.body.user);
    const id = updatedUser.user_id;
    const username = updatedUser.username;
    if (req.file) {
        const user2Update = await User.findOne({ where: { id: id } });
        const filename = user2Update.avatar.split("/images/")[1];
        console.log(filename);
        if (filename !== "public/avatar/sun.png") {
            fs.unlink(`images/${filename}`, async () => {
                user2Update.username = username;
                (user2Update.avatar = `${req.protocol}://${req.get(
                    "host"
                )}/images/${req.file.filename}`),
                    await user2Update
                        .save()
                        .then((data) => res.status(200).json({ data }))
                        .catch((error) => res.status(400).json({ error }));
            });
        } else {
            user2Update.username = username;
            user2Update.avatar = `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
            }`;
            await user2Update
                .save()
                .then((data) => res.status(200).json({ data }))
                .catch((error) => res.status(400).json({ error }));
        }
    } else {
        const user2Update = await User.findOne({ where: { id: id } });
        user2Update.username = username;
        await user2Update
            .save()
            .then((data) => res.status(200).json({ data }))
            .catch((error) => res.status(400).json({ error }));
    }
};

exports.deleteOne = async (req, res, next) => {
    await User.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Utilisateur supprimé" }))
        .catch((error) => res.status(400).json({ error }));
};
