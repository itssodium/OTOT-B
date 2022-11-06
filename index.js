const express = require("express");
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.options('*', cors())

var rawUserInfo = fs.readFileSync('./data.json');
var userInfo = JSON.parse(rawUserInfo);

//gcloud app deploy would give the link to frontend
app.get('/get', async (req, res) => {
        const isEmpty = userInfo.length === 0
        if (isEmpty) {
            res.status(404).send('no users present');
        } else {
            const names = userInfo.map(user => {
                return `Name: ${user.name}, Role: ${user.role}`
            });
            res.status(200).send(`Users are ${names.toString()}`);
        }
})

app.post('/post', async (req, res) => {
    const name = req.body.name;
    const role = req.body.role;
    if (name == null || role == null || name.length === 0 || role.length === 0) {
        return res.status(400).send("Please fill up name and role")
    }

    const names = userInfo.filter(user => user.name === name);
    const isPresent = names.length != 0;

    if (isPresent) {
        res.status(208).send(`${name} already exists, use put for updates`)
    } else {
        const data = {name: name, role: role};
        userInfo.push(data);
        var newRawUserInfo = JSON.stringify(userInfo);
        fs.writeFileSync('./data.json', newRawUserInfo);
        res.status(201).send(`${name} added`)
    }
})

app.put('/put', async (req, res) => {
    const name = req.body.name;
    const role = req.body.role;
    if (name == null || role == null || name.length === 0 || role.length === 0) {
        return res.status(400).send("Please fill up name and role")
    }
    
    const names = userInfo.filter(user => user.name === name);
    const isPresent = names.length != 0;

    if (isPresent) {
        userInfo.forEach(user => {
            if (user.name === name) {
                user.role = role;
            }
        })
        var newRawUserInfo = JSON.stringify(userInfo);
        fs.writeFileSync('./data.json', newRawUserInfo);
        res.status(200).send(`${name} role is changed`)
    } else {
        res.status(404).send(`${name} is not present, use POST to add user`);
    }
})

app.delete('/delete', async (req, res) => {
    const isEmpty = userInfo.length === 0
    if (isEmpty) {
        res.status(404).send('no users to delete');
    } else {
        userInfo = []
        var newRawUserInfo = JSON.stringify(userInfo);
        fs.writeFileSync('./data.json', newRawUserInfo);
        res.status(200).send(`users are deleted`);
    }
})

app.listen(process.env.PORT || 5000)
module.exports = app; 
