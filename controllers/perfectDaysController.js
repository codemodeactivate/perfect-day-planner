//code to handle getall, findone, etc all that jazz
const { PerfectDay, User, OptionSet } = require("../models");
const { generateGuestKey } = require("../helpers/guestKey");
module.exports = {
    //create
    create: async (req, res, next) => {
        try {
            // console.log("------------------------------------");
            // console.log("REQ SESSION IS: " + req.body);
            // console.log("------------------------------------");
            const guestKey = generateGuestKey();
            const day = await PerfectDay.create({
                title: req.body.title,
                description: req.body.description,
                status: req.body.status || "In Progress",
                // You may also want to add the user ID here, if "perfect days" are associated with users
                user_id: req.session.user_id,
                guestKey: guestKey,
            });
            res.status(201).json(day);
        } catch (error) {
            res.status(500).json({ error: "Failed to create perfect day" });
        }
    },
    edit: async (req, res) => {
        console.log(req.body);
        console.log(req.body.options);
        const id = req.params.id;
        const { title, description, options } = req.body;
        console.log("Options:", options);
        try {
            // Update perfect day
            await PerfectDay.update(
                { title, description },
                { where: { id: id } }
            ); //RIN - added :id to this line

            if (options && options.length) {
                // Assuming options is an array of {id, option1, option1_image, option2, option2_image} objects
                for (let i = 0; i < options.length; i++) {
                    const option = options[i];
                    let optionSet = null; //RIN - initialize option set outside of if
                    if (option.id) {
                        optionSet = await OptionSet.findOne({
                            where: { id: option.id },
                        }); //RIN - put if statement in
                    }
                    //console.log("Option Set: " + OptionSet);
                    if (optionSet) {
                        await optionSet.update(option);
                        console.log("Option Set:", optionSet);
                    } else {
                        // await OptionSet.create({
                        //   option1: option.option1.text,
                        //   option1_image: option.option1.image,
                        //   option2: option.option2.text,
                        //   option2_image: option.option2.image,
                        //   perfect_day_id: id,
                        // });

                        // Ideal payload format
                        await OptionSet.create({
                            option1: option.option1,
                            option1_image: option.option1_image,
                            option2: option.option2,
                            option2_image: option.option2_image,
                            perfect_day_id: id,
                        });
                    }
                }
            }

            res.json({ message: "Perfect Day updated successfully." });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "An error occurred while updating Perfect Day.",
            });
        }
    },

    view: async (req, res, next) => {
        try {
            const day = await PerfectDay.findOne({
                where: {
                    id: req.params.id,
                },
                include: [
                    { model: User },
                    {
                        model: OptionSet,
                        as: "options", // Both 'model' and 'as' properties are part of the same object.
                    },
                ],
            });
            console.log("June 1st: " + day);
            res.status(200).json(day);
        } catch (error) {
            console.log(error); // <-- Log the error
            res.status(500).json({ error: "Failed to view perfect day" });
        }
    },
    delete: async (req, res, next) => {
        try {
          // Find associated OptionSet records and delete them
          const optionSets = await OptionSet.findAll({
            where: {
              perfect_day_id: req.params.id,
            },
          });
          for (let optionSet of optionSets) {
            await optionSet.destroy();
          }
          // Then delete the PerfectDay
          await PerfectDay.destroy({
            where: {
              id: req.params.id,
            },
          });
          res.redirect("/dashboard");
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Failed to delete Perfect Day" });
        }
      },
      guestView: async (req, res, next) => {
        try {
            const guestKey = req.params.guestKey;
            const perfectDayId = req.params.id;
            const perfectDay = await PerfectDay.findOne(perfectDayId, {
                where: {
                    guestKey: guestKey,
                },
                include: [
                    {
                        model: OptionSet,
                        as: 'options',

                    }
                ]
            });
            if (!perfectDay) {
                return res.status(404).json({ error: "Perfect Day not found" });
            }
            res.render('guest-view', { perfectDay });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to view perfect day" });

        }
    },
};
