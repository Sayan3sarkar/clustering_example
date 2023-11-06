const os = require("os");
const { isMaster, fork } = require("cluster");

if (isMaster) {
  // Master process
  console.log("Inside master process");
  n_cpus = os.cpus().length;
  for (let i = 0; i < n_cpus; i++) {
    fork();
  }
} else {
  const { createServer } = require("http");

  const app = require("./app");

  const server = createServer(app);

  server.listen(3000, () => {
    console.log(`Server: ${process.pid} started at port 3000`);
  });
}
