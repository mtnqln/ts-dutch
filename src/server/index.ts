import express from "express";
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {Server} from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url))
const frontendDist = join(__dirname, "../../frontend/dist");

// Serving my public directory
app.use(express.static(frontendDist));

// Personnalized routes
app.get("/",(_req,res)=>{
    res.sendFile(join(__dirname,'../public/index.html'))
})

// Wrapper of a websocket connection
io.on('connection',(socket)=>{
    console.log('A user connected');
    socket.on('chat message',(msg:string)=>{
        console.log("Message : " + msg);
    })
    socket.on('disconnect',()=>{
        console.log('a user disconnected');
    })

    socket.on("chat message",(msg)=>{
        io.emit("chat message",msg);
    })

})

server.listen(3000,()=>{
    console.log('server running on port 3000')
})
