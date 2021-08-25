const express = require("express");
const makeStoppable = require("stoppable")
const http = require("http");

const app = express();

const authRouter = require('./routes/auth');
const tasksRouter = require('./routes/tasks');

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/tasks', tasksRouter);

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
