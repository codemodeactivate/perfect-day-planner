//code to handle getall, findone, etc all that jazz
const { PerfectDay, User } = require("../models");
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
    edit: async (req, res, next) => {
        try {
            const day = await PerfectDay.findOne({
                where: {
                    id: req.params.id
                },
                include: User,
            });

            if (!day) {
                res.status(404).json({ error: "Perfect day not found" });
                return;
            }

            day.title = req.body.title;
            day.description = req.body.description;
            day.status = req.body.status;
            await day.save();

            res.status(200).json(day);
        } catch (error) {
            res.status(500).json({ error: "Failed to edit perfect day" });
        }
    },

    view: async (req, res, next) => {
        try {
            const day = await PerfectDay.findOne({
                where: {
                    id: req.params.id,
                },
                include: User,
            });
            console.log("June 1st: " + day);
            res.status(200).json(day);
        }
        catch (error) {
            res.status(500).json({ error: "Failed to view perfect day" });
        }
    },
};
