const express = require("express");
const cors = require('cors');
const MongoClient = require("mongodb").MongoClient;

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

var client;
var collection;

async function connect() {
    client = await MongoClient.connect('mongodb://localhost:27017/');
    const collections = await client.db().listCollections().toArray();
    const containsUsers = collections.map(c => c.name).includes('users');
    if (containsUsers) {
        const db = await client.db();
        collection = db.collection('users');
        console.log('contains')
    } else {
        const db = await client.db();
        db.createCollection('users');
        collection = db.collection('users');
        console.log('created')
    }
}

connect().then(() => {
    app.get('/get', async (req, res) => {
        const db = client.db();
        const collection = db.collection('users');
        const users_mongo = await collection.find().toArray();
        const isEmpty = users_mongo.length === 0
        console.log(isEmpty);
        if (isEmpty) {
            res.status(204).send('no users present');
        } else {
            const users_mongo = await collection.find().toArray();
            const names = users_mongo.map(user => {
                return `Name: ${user.name}, Role: ${user.role}`
            });
            res.status(200).send(`Users are ${names.toString()}`);
        }
        
    })
});

//gcloud app deploy would give the link to frontend
/*app.get('/get', async (req, res) => {
    const db = client.db();
    const collection = db.collection('users');
    const users_mongo = await collection.find().toArray();
    const isEmpty = users_mongo.length === 0
    console.log(isEmpty);
    if (isEmpty) {
        res.status(204).send('no users present');
    } else {
        const users_mongo = await collection.find().toArray();
        const names = users_mongo.map(user => {
            return `Name: ${user.name}, Role: ${user.role}`
        });
        res.status(200).send(`Users are ${names.toString()}`);
    }
    
})*/

app.post('/post', async (req, res) => {
    const name = req.body.name;
    const role = req.body.role;
    if (name == null || role == null || name.length === 0 || role.length === 0) {
        return res.status(400).send("Please fill up name and role")
    }

    const db = await client.db();
    const collection = db.collection('users');
    const users_mongo = await collection.find().toArray();
    const names_mongo = users_mongo.map(user => user.name);
    const isPresent = names_mongo.includes(name);

    if (isPresent) {
        res.status(208).send(`${name} already exists, use put for updates`)
    } else {
        const data = {name: name, role: role};
        collection.insertOne(data);
        res.status(201).send(`${name} added`)
    }
})

app.put('/put', async (req, res) => {
    const name = req.body.name;
    const role = req.body.role;
    if (name == null || role == null || name.length === 0 || role.length === 0) {
        return res.status(400).send("Please fill up name and role")
    }

    const db = await client.db();
    const collection = db.collection('users');
    const users_mongo = await collection.find().toArray();
    const names_mongo = users_mongo.map(user => user.name);
    const isPresent = names_mongo.includes(name);

    if (isPresent) {
        const change = {name: name};
        const data = {name: name, role: role};
        collection.replaceOne(change, data).then((value) => {
            res.status(200).send(`${name} role is changed`);
        });
    } else {
        res.status(404).send(`${name} is not present, use POST to add user`);
    }
})

app.delete('/delete', async (req, res) => {
    client.db().collection('users').find().toArray().then(arr => {
        const isEmpty = arr.length === 0
        if (isEmpty) {
            res.status(204).send('no users to delete');
        } else {
            collection.remove().then((value) => {
                res.status(200).send(`users are deleted`);
            });
        }
    });

    /*const db = await client.db();
    const collection = db.collection('users');
    const users_mongo = await collection.find().toArray();
    const isEmpty = users_mongo.length === 0
    if (isEmpty) {
        res.status(204).send('no users to delete');
    } else {
        collection.remove().then((value) => {
            res.status(200).send(`users are deleted`);
        });
    }*/
})

app.listen(process.env.PORT || 5000)
module.exports = app; 
