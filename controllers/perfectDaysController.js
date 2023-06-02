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
    edit: async (req, res) => {
        const id = req.params.id;
        const { title, description, options } = req.body;
        try {
            // Update perfect day
            await PerfectDay.update({ title, description }, { where: { id } });

            // Assuming options is an array of {id, option1, option1_image, option2, option2_image} objects
            for (let option of options) {
                await OptionSet.update(option, { where: { id: option.id } });
            }

            res.json({ message: 'Perfect Day updated successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while updating Perfect Day.' });
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
