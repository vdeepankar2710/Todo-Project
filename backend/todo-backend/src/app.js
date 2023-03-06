const express = require('express');
const app = express();

const port = 8080;
app.use(express.json());
const mongo = require('./mongoDB');


async function main() {
    const dbClient = await mongo.MongoClient.connect(mongo.url)
    console.log('conneted to database successfully');

    const db = dbClient.db('todo-list');
    const taskCollection = db.collection('tasks');

    // console.log("taskCollection", taskCollection);
    app.post('/addTask', (req, resPost) => {
        console.log("req in /addTask", req.body);
        if (!req.body.heading) return resPost.send('heading not provided').status(400);
        if (!req.body.description) return resPost.send('description not provided').status(400);

        taskCollection.insertOne({
            heading: req.body.heading,
            description: req.body.description
        }).then((res) => {
            resPost.send('added successfully').status(200);
            console.log("res from insertion", res);
        }).catch((err) => {
            console.log("err from insertion", err);
            resPost.send(err).status(500);
        })
    })

    app.post('/updateTask', (req, resPost) => {
        const desc = req.body.description || "";
        const heading = req.body.heading || "";
        if (!req.body.id) resPost.send('id not provided').status(400);
        const id = new mongo.ObjectId(req.body.id);

        taskCollection.findOneAndUpdate({ _id: id }, { $set: { "description": desc, "heading": heading } })
            .then((res) => {
                resPost.send('updated data successfully').status(200);
                // console.log("res in find and update", res);
            }).catch((err) => {
                console.log("error in finding the required item", err);
                resPost.send(err).status(500);
            })
    })

    app.post('/deleteTask', (req, resPost) => {
        console.log('req in delete', req.body);
        if (!req.body.id) resPost.send('id for deletion not provided').status(400);

        const id = new mongo.ObjectId(req.body.id);

        taskCollection.deleteOne({ "_id": id }).then((res) => {
            console.log("res in delete", res);

            resPost.send('deleted successfully').status(200);
        }).catch((err) => {
            console.log(err);
            resPost.send(err).status(500);

        });
    })

    app.get('/getAllTodos', (req, resGet) => {
        taskCollection.find({}).toArray().then((res) => {
            console.log("all get tasks", res);
            // console.log(resGet)
            resGet.send(res).status(200);

        }).catch((err) => {
            resPost.send(err).status(500);
        })
    })

}

main();

app.listen(port, () => {
    console.log('the server is listening on port::8080');

})