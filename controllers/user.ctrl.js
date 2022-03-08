const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");
const db = require("../models");
const User = db.user;

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
                                    },
                                    process.env.JWT,
                                    {
                                        expiresIn: "24h",
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
    const updatedUser = await User.findOne({ where: { id: req.params.id } });
    updatedUser.username = req.body.username;
    await updatedUser
        .save()
        .then((data) => res.status(200).json({ data }))
        .catch((error) => res.status(400).json({ error }));
};
