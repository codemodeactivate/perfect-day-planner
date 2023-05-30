//code to handle getall, findone, etc all that jazz
const { User } = require('../models');

module.exports = {
    //get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //get one user
    getUserById: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //create a user
    createUser: async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //update a user
    updateUser: async (req, res) => {
        try {
            const user = await User.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //delete a user
    deleteUser: async (req, res) => {
        try {
            const user = await User.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //signup
    signup: async (req, res) => {
        try {
            const user = await User.create(req.body);
            req.session.save(() => {
                req.session.user_id = user.id;
                req.session.logged_in = true;
                const { password, ...userData } = newUser.dataValues;
                res.redirect('/create-perfect-day');
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //login



    //logout
    logout: async (req, res) => {
        try {
            if (req.session.logged_in) {
                req.session.destroy(() => {
                    res.status(204).end();
                });
            } else {
                res.status(404).end();
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
};
