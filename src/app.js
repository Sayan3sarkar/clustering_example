const express = require("express");
const { fork } = require("child_process");
const { join } = require("path");

const app = express();

app.use(express.json());

app.get("/healthz", (req, res) => {
  return res.sendStatus(200);
});

app.get("/isPrime/:num", (req, res) => {
  const { num } = req.params;

  const child_process_path = join(__dirname, "./isPrime.js");
  const childProcess = fork(child_process_path);

  childProcess.send({
    number: Number(num),
  });

  childProcess.on("message", (msg) => {
    return res.send(msg);
  });

  childProcess.on("error", (err) => {
    return res.status(500).send(`Error in child process of isPrime: ${err}`);
  });
});

module.exports = app;
