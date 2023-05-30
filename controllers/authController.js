controllers/authController.js
const { User } = require('../models');

module.exports = {
    //login
    login: async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    username: req.body.email
                }
            });
            if (!user) {
                res.status(400).json({ message: 'No user account found!' });
                return;
            }
            const validPassword = await user.checkPassword(req.body.password);
            if (!validPassword) {
                res.status(400).json({ message: 'No user account found!' });
                return;
            }
            req.session.save(() => {
                req.session.user_id = user.id;
                req.session.logged_in = true;
                res.redirect('/create-perfect-day');
            },
            )
        } catch (err) {
            res.status(500).json(err);
        }
    },
    renderLogin: async (req, res) => {
        // ... your existing renderLogin code
    },
    //signup
    signup: async (req, res) => {
        // ... your existing signup code
    },
    //logout
    logout: async (req, res) => {
        // ... your existing logout code
    }
};
