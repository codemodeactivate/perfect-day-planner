//code to handle getall, findone, etc all that jazz
const { PerfectDay, User, OptionSet } = require("../models");
const { generateGuestKey } = require("../helpers/guestkey");
const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');

// // Custom Handlebars helper function to compare values
// handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
//   switch (operator) {
//     case '==':
//       return v1 == v2 ? options.fn(this) : options.inverse(this);
//     case '===':
//       return v1 === v2 ? options.fn(this) : options.inverse(this);
//     case '!=':
//       return v1 != v2 ? options.fn(this) : options.inverse(this);
//     case '!==':
//       return v1 !== v2 ? options.fn(this) : options.inverse(this);
//     case '<':
//       return v1 < v2 ? options.fn(this) : options.inverse(this);
//     case '<=':
//       return v1 <= v2 ? options.fn(this) : options.inverse(this);
//     case '>':
//       return v1 > v2 ? options.fn(this) : options.inverse(this);
//     case '>=':
//       return v1 >= v2 ? options.fn(this) : options.inverse(this);
//     case '&&':
//       return v1 && v2 ? options.fn(this) : options.inverse(this);
//     case '||':
//       return v1 || v2 ? options.fn(this) : options.inverse(this);
//     default:
//       return options.inverse(this);
//   }
// });

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
                status: req.body.status || "In Progress",
                // You may also want to add the user ID here, if "perfect days" are associated with users
                user_id: req.session.user_id,
                guestKey: generateGuestKey(),
            });
            res.status(201).json(day);
        } catch (error) {
            res.status(500).json({ error: "Failed to create perfect day" });
        }
    },

    edit: async (req, res) => {
      console.log(req.body);
      const id = req.params.id;
      const { title, description, options } = req.body;
      console.log("Options:", options);

      try {
        // Update perfect day
        await PerfectDay.update(
          { title, description },
          { where: { id } }
        );

        if (options && options.length) {
          for (let i = 0; i < options.length; i++) {
            const option = options[i];
            console.log("Option:", option);
            let optionSet = null;

            if (option.id) {
              optionSet = await OptionSet.findOne({
                where: { id: option.id },
              });
            }

            if (optionSet) {
              await optionSet.update({
                option1: option.option1.text || "",
                option1_image: option.option1.image || "",
                option2: option.option2.text || "",
                option2_image: option.option2.image || "",
              });
              console.log("Option Set:", optionSet);
            } else {
              await OptionSet.create({
                option1: option.option1.text || "",
                option1_image: option.option1.image || "",
                option2: option.option2.text || "",
                option2_image: option.option2.image || "",
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
        const day = await PerfectDay.findByPk(req.params.id, {
          include: [
            { model: User },
            {
              model: OptionSet,
              as: "options",
            },
          ],
        });

        if (!day) {
          return res.status(404).json({ error: "Perfect Day not found" });
        }

        const { guestKey } = day;
        res.status(200).json({ day: day.toJSON(), guestKey });
      } catch (error) {
        console.log(error);
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
          const { guestKey } = req.params;

          console.log('Guest Key:', guestKey);

          const perfectDay = await PerfectDay.findOne({
            where: {
              guestKey: guestKey,
            },
            include: [
              {
                model: OptionSet,
                as: 'options',
              },
            ],
          });

          console.log('Perfect Day:', perfectDay);

          if (!perfectDay) {
            console.log('Perfect Day not found');
            return res.status(404).json({ error: "Perfect Day not found" });
          }

          // Render the guest-view template with the perfectDay data
          res.render('guest-view', { perfectDay: perfectDay.toJSON() });
        } catch (error) {
          console.log('Error:', error);
          res.status(500).json({ error: "Failed to view perfect day" });
        }
      },
};
