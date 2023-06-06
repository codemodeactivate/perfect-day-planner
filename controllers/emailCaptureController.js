const { Subscriber } = require("../models");

module.exports = {

    captureEmail: async (req, res) => {
        // capture email from form
        console.log('Received POST to /sub');
        console.log('REQ Body: ', req.body);

        const email = req.body.email;

        if (!email) {
            console.log('No email provided');
            res.status(400).send('No email provided');
            return;
        }

        try {
            const newSubscriber = await Subscriber.create({
                email: email,  // ensure you're setting the `email` property of the new Subscriber
            });
            console.log('New subscriber created:', newSubscriber);
            res.status(201).send(newSubscriber);
        } catch (error) {
            console.error(error);
            res.status(500).send('ERROR ERROR ERROR');
        }
    }
}
