const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config()

const path = require('path');

//Twilio config
const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

//Roue to text list via Twilio
app.post('/api', (req, res) => {
    console.log(req.body.number);
    client.messages
        .create({
            body: req.body.list,
            from: process.env.NUMBER,
            to: `1${req.body.number}`
        })
        .then(message => console.log(message));

    res.send("SMS sent to you too!")
});


// Serve static assets if in production 
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
};


//Express server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
