const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");

const middlewares = jsonServer.defaults({
    static:"./build"
})

const port = process.env.PORT || 8080;

server.use(middlewares);

server.use(
    jsonServer.rewriter({
        "/api/*":"/$1"
    })
);

server.use(router);

server.listen(port,() => {
    console.log("server is running on port 8080")
})