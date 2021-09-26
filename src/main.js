const express = require("express");
const bodyParser = require("body-parser");
const makeStoppable = require("stoppable")
const http = require("http");
const {graphqlHTTP} = require("express-graphql");
const mongoose = require("mongoose");

const app = express();

const { schema } = require('./schema');

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
    //context: () => ({})
}));

app.get('/', (req, res) => {
    res.send('Graphql is amazing!');
});

const server = makeStoppable(http.createServer(app));

module.exports = async () => {

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/tasks', {
        useNewUrlParser: true,
        useUnifiedTopology: true
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
