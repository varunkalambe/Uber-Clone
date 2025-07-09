const http = require('http');
const app = require('./App');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () =>{
    console.log(`The server is listening to ${port}`);
});

