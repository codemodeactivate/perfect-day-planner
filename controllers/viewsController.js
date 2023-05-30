module.exports = {
    renderLogin: async (req, res) => {
        try {
            res.render("login");
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
