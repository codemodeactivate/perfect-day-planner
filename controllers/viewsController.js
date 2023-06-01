const { PerfectDay, User } = require("../models");

module.exports = {
    renderLogin: async (req, res) => {
        try {
            res.render("login");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    renderHomepage: async (req, res) => {
        try {
            res.render("homepage");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    renderSignup: async (req, res) => {
        try {
            res.render("signup");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    renderPerfectDay: async (req, res) => {
        try {
            res.render("perfect-day");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    renderDashboard: async (req, res) => {
        try {
            // Check if req.session is defined
            if (!req.session) {
                throw new Error('Session is undefined');
            }

            const userId = req.session.user_id;
            //console.log(req.session);
            // Check if userId is defined
            if (!userId) {
                throw new Error('User ID is undefined');
            }

            // Query the User model instead of the PerfectDay model
            const user = await User.findOne({
                where: {
                    id: userId
                },
                include: PerfectDay // Include the PerfectDay model
            });
            console.log("USER: " + user);

            // If a user is found, the user object will include their associated PerfectDays.
            // If the user hasn't created any perfect days yet, this will be an empty array.
            const perfectDays = user ? user.PerfectDays : [];

            // Render the dashboard with the user and their perfect days
            res.render('dashboard', { user: user.toJSON(), perfectDays });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
};
