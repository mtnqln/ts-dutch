import { IncomingMessage, Server, ServerResponse } from "http";


// ToDo : HTTPS
export class Network {
    server: Server<typeof IncomingMessage, typeof ServerResponse> 

    constructor(){

    }
}