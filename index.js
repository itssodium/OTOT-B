const express = require("express");
const cors = require('cors');

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

var users = [
    {
        name: 'user1',
        role: 'viewer'
    }
]
//gcloud app deploy would give the link to frontend
app.get('/get', (req, res) => {
    names = users.map(user => user.name);
    res.status(200).send(`Users are ${names.toString()}`)
})

app.post('/post', (req, res) => {
    const name = req.body.name;
    const role = req.body.role;
    if (name == null || role == null || name.length === 0 || role.length === 0) {
        return res.status(400).send("Please fill up name and role")
    }
    const isPresent = users.some(user => user.name === name)
    if (isPresent) {
        res.status(208).send(`${name} already exists, use put for updates`)
    } else {
        users.push({name: name, role: role})
        res.status(201).send(`${name} added`)
    }
})

app.put('/put', (req, res) => {
    const name = req.body.name;
    const role = req.body.role;
    if (name == null || role == null || name.length === 0 || role.length === 0) {
        return res.status(400).send("Please fill up name and role")
    }
    const isPresent = users.some(user => user.name === name)
    if (isPresent) {
        users.forEach(user => {
            if (user.name === name) {
                user.role = role;
            }
        })
        res.status(200).send(`${name} role is changed`)
    } else {
        res.status(204).send(`${name} is not present, use POST to add user`)
    }
})

app.delete('/delete', (req, res) => {
    const isEmpty = users.length === 0
    if (isEmpty) {
        res.status(405).send(`no users exist`)
    } else {
        users = []
        res.status(200).send(`users are deleted`)
    }
})

app.listen(process.env.PORT || 5000)
module.exports = app; 

