const { PerfectDay } = require('../models');

module.exports = {
  //create
  create: async (req, res, next) => {
    try {
      console.log('------------------------------------');
      console.log('REQ SESSION IS: ' + req.body);
      console.log('------------------------------------');
      const day = await PerfectDay.create({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status || 'In Progress',
        user_id: req.session.user_id,
      });
      res.status(201).json(day);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create perfect day' });
    }
  },

  //update
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, status, choice1, choice2, checkbox } = req.body;

      const updatedPerfectDay = await PerfectDay.update(
        {
          title,
          description,
          status,
          choice1,
          choice2,
          checkbox,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json(updatedPerfectDay);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update perfect day' });
    }
  },
};

