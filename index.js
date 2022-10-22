const express = require("express");
const app = express();
app.use(express.json())
var users = [
    {
        name: 'user1',
        role: 'viewer'
    }
]

app.get('/get', (req, res) => {
    names = users.map(user => user.name);
    res.status(200).send(`Users are ${names.toString()}`)
})

app.post('/post', (req, res) => {
    const name = req.body.name;
    const role = req.body.role;
    const isPresent = users.some(user => user.name === name)
    if (isPresent) {
        res.status(200).send(`${name} already exists`)
    } else {
        users.push({name: name, role: role})
        res.status(200).send(`${name} added`)
    }
})

app.put('/put', (req, res) => {
    const name = req.body.name;
    const role = req.body.role;
    const isPresent = users.some(user => user.name === name)
    if (isPresent) {
        users.forEach(user => {
            if (user.name === name) {
                user.role = role;
            }
        })
        res.status(200).send(`${name} role is changed`)
    } else {
        res.status(200).send(`${name} is not present, use POST to add user`)
    }
})

app.delete('/delete', (req, res) => {
    const name = req.body.name;
    const isPresent = users.some(user => user.name === name)
    if (isPresent) {
        users = users.filter(user => user.name != name)
        res.status(200).send(`${name} is deleted`)
    } else {
        res.status(200).send(`${name} does not exist`)
    }
    
})

app.listen(3000)