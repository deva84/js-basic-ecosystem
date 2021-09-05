const express = require("express");
const bodyParser = require("body-parser");
const makeStoppable = require("stoppable")
const http = require("http");

const config = require('../src/config');
const sequelize = require('./connection').sequelize;

const authRouter = require('./routes/auth');
const tasksRouter = require('./routes/tasks');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/auth', authRouter);
app.use('/api/tasks', tasksRouter);

const server = makeStoppable(http.createServer(app));

function connectToMySql() {
    sequelize
        .authenticate()
        .then(() => console.info('Successfully connected to MySql'))
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
    return sequelize;
}

module.exports = async () => {
    const mysql =  await connectToMySql();
    config.client = mysql;

    const stopServer = () => {
        return new Promise((resolve) => {
            server.stop(resolve);
        })
    };

    return new Promise((resolve) => {
        server.listen(3000, () => {
            console.log('Express server is listening on http://localhost:3000');
            resolve(stopServer);
        });
    });
}
