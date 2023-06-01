//code to handle getall, findone, etc all that jazz
const { PerfectDay } = require("../models");
module.exports = {
    //create
    create: async (req, res, next) => {
        try {
            console.log("------------------------------------");
            console.log("REQ SESSION IS: " + req.body);
            console.log("------------------------------------");
            const day = await PerfectDay.create({
                title: req.body.title,
                description: req.body.description,
                status: req.body.status || 'In Progress',
                // You may also want to add the user ID here, if "perfect days" are associated with users
                user_id: req.session.user_id,
            });
            res.status(201).json(day);
        } catch (error) {
            res.status(500).json({ error: "Failed to create perfect day" });
        }
    },
};
