//code to handle getall, findone, etc all that jazz
//function that talks to the Router
//code to handle getall, findone, etc all that jazz
const { PerfectDay, User, OptionSet, SelectedOption } = require("../models");
//const { generateGuestKey } = require("../helpers/guestkey");
const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');



module.exports = {

    captureOption: async (req, res) => {
        const { option_set_id, selectedOption: selectedOptionValue } = req.body;

        try {
            const newSelectedOption = await SelectedOption.create({
                SelectedOption: selectedOptionValue,
                option_set_id
            })

            res.status(200).json(newSelectedOption);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to save selected option' });
        }
    }
}
