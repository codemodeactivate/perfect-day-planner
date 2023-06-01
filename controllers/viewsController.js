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
    renderPerfectDayEdit: async (req, res) => {
      try {
        // Fetch the perfect day from your database
        const perfectDay = await PerfectDay.findOne({
          where: {
            id: req.params.id
          }
        });

        // If perfect day doesn't exist, send a 404 response
        if (!perfectDay) {
          res.status(404).send('Perfect day not found');
          return;
        }

        // If perfect day exists, render the edit page with perfect day data
        res.render("perfect-day-edit", { perfectDay: perfectDay.toJSON() });
      } catch (err) {
        res.status(500).json(err);
      }
    },
    renderDashboard: async (req, res) => {
        try {
          if (!req.session) {
            throw new Error('Session is undefined');
          }

          const userId = req.session.user_id;

          if (!userId) {
            throw new Error('User ID is undefined');
          }

          const user = await User.findOne({
            where: {
              id: userId
            },
            include: PerfectDay
          });

          const perfectDays = user ? user.perfect_days : [];

          console.log('USER:', user);
          console.log('Perfect Days:', perfectDays);
          console.log('TYPEOF: ' + typeof perfectDays);

          res.render('dashboard', { user: user.toJSON(), perfectDays });
        } catch (err) {
          console.error(err);
          res.status(500).json(err);
        }
      },

};
