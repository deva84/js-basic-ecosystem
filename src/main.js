const express = require("express");
const http = require("http");
const makeStoppable = require("stoppable")
const mongoose = require('mongoose');

const app = express();

const authRouter = require('./routes/auth');
const tasksRouter = require('./routes/tasks');

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/tasks', tasksRouter);

const server = makeStoppable(http.createServer(app));

module.exports = async () => {
    mongoose.connect('mongodb+srv://new_database:test1234@cluster0.lnisb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    const stopServer = () => {
        return new Promise((resolve) => {
            mongoose.disconnect();
            server.stop(resolve);
        })
    };

    await new Promise((resolve, reject) => {
        mongoose.connection.on('error', reject);
        mongoose.connection.on('open', resolve);
    });

    return new Promise((resolve) => {
        server.listen(3000, () => {
            console.log('Express server is listening on http://localhost:3000');
            resolve(stopServer);
        });
    });
}
