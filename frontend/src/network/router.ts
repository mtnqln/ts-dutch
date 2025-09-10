import {io} from 'socket.io-client';

const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input') as HTMLInputElement;
const messages = document.getElementById("messages");

form?.addEventListener('submit',(e)=>{
    e.preventDefault();
    if (input.value){
        socket.send("message","hello");
        socket.emit('chat message',input.value);
        input.value = '';
    }

})

socket.on("chat message",(msg)=>{
  const item = document.createElement("li");
  item.textContent = msg;
  messages?.appendChild(item);
  window.scrollTo(0,document.body.scrollHeight);
})