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
};
