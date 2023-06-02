//code to handle getall, findone, etc all that jazz
const { PerfectDay, User, OptionSet } = require("../models");
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
        console.log(req.body);
        console.log(req.body.options);
        const id = req.params.id;
        const { title, description, options } = req.body;
        console.log('Options:', options);
        try {
          // Update perfect day
          await PerfectDay.update({ title, description }, { where: { id } });

          if (options && options.length) {
            // Assuming options is an array of {id, option1, option1_image, option2, option2_image} objects
            for (let i = 0; i < options.length; i++) {
              const option = options[i];
              const optionSet = await OptionSet.findOne({ where: { id: option.id } });
              //console.log("Option Set: " + OptionSet);
              if (optionSet) {
                await optionSet.update(option);
                console.log('Option Set:', optionSet);
              } else {
                await OptionSet.create({
                  option1: option.option1.text,
                  option1_image: option.option1.image,
                  option2: option.option2.text,
                  option2_image: option.option2.image,
                  perfect_day_id: id,
                });
              }
            }
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
                include: [
                    { model: User },
                    {
                      model: OptionSet,
                      as: 'options'  // Both 'model' and 'as' properties are part of the same object.
                    }
                ],
            });
            console.log("June 1st: " + day);
            res.status(200).json(day);
        }
        catch (error) {
            console.log(error); // <-- Log the error
            res.status(500).json({ error: "Failed to view perfect day" });
        }
    },
};
