//controllers/authController.js
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
    
    logout: async (req, res, next) => {
        try {
          if (req.session) {
            // Perform additional cleanup tasks if needed

            // Destroy the session
            req.session.destroy((err) => {
              if (err) {
                // Pass the error to the next middleware
                return next(err);
              }

              // Redirect the user to the homepage
              return res.redirect("/");
            });
          } else {
            // Session doesn't exist, redirect to homepage
            return res.redirect("/");
          }
        } catch (err) {
          // Handle any unexpected errors
          return next(err);
        }
      },

};
