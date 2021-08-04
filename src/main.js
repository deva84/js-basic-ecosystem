const express = require("express");
const makeStoppable = require("stoppable");
const http = require("http");
const path = require('path');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const routes = require('./../routes');
const TaskService = require('./../services/TaskService');

const app = express();

app.set('trust proxy', 1);

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));

app.use(bodyParser.urlencoded({extended: true}));

const todoTaskService = new TaskService('./assets/data/todo.json');
const doneTaskService = new TaskService('./assets/data/done.json')

app.set('view engine', 'ejs');
app.set('/views', path.join(__dirname, './views'));

app.locals.siteName = 'Simple TODO Application';

app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/', routes({todoTaskService, doneTaskService}));

const server = makeStoppable(http.createServer(app));

module.exports = () => {
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
