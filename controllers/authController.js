//controllers/authController.js
const { User } = require('../models');
const zxcvbn = require('zxcvbn');
module.exports = {
    //login
    login: async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    username: req.body.email,
                },
            });
            if (!user) {
                res.status(400).json({ message: "No user account found!" });
                return;
            }
            const validPassword = await user.checkPassword(req.body.password);
            if (!validPassword) {
                res.status(400).json({ message: "No user account found!" });
                return;
            }
            req.session.save(() => {
                req.session.user_id = user.id;
                req.session.logged_in = true;
                res.redirect("/create-perfect-day");
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    renderLogin: async (req, res) => {
        // ... your existing renderLogin code
    },
    //signup
    signup: async (req, res, next) => {
        try {
            console.log(req.body);

            // Check if passwords match
            if (req.body.password !== req.body.confirmPassword) {
                return res
                    .status(400)
                    .send({ error: "Passwords do not match." });
            }

            // Check password strength
            const passwordStrength = zxcvbn(req.body.password);
            if (passwordStrength.score < 3) {
                return res.status(400).send({ error: "Password is too weak." });
            }

            const existingUser = await User.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (existingUser) {
                return res.status(400).json({
                    message: "User already exists!",
                });
            }

            // Create a new user in the database
            const newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            });
            req.session.user_id = newUser.id;
            req.session.logged_in = true;

            const { password, ...userData } = newUser.dataValues;
            // Redirect the user to the dashboard
            return res.redirect("/dashboard");
        } catch (err) {
            if (err.name === "SequelizeValidationError") {
                return res.status(400).send({ error: err.errors[0].message });
            } else {
                return next(err);
            }
        }
    },
    //logout
    logout: async (req, res) => {
        // ... your existing logout code
    },
};
