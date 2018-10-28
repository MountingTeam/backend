import app from "./app";

const debug = require("debug")("backend:server");
const http = require("http");

const port = normalizePort(process.env.PORT || "8080");

app.set("port", port);

const server = http.createServer(app);

server.listen(port, (err: any) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(
    `GraphQL Server is now running on localhost:${process.env.PORT || 8080}`
  );
});

server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val: any) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
