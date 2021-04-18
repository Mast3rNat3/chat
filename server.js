const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(express.static("public"));

const io = require('socket.io')(3005);

const chatlog = [];

io.on("connection", (socket) => {
  console.log('a user is connected');
  socket.join('chat');
  socket.emit('chatLog',chatlog);
  socket.on('sendMessage',(data)=>{
    if(typeof data==='object'&&data.username&&data.message){
      if(typeof data.username==='string'&&typeof data.message==='string') {
        const newMessage = {username:data.username,message:data.message};
        chatlog.push(newMessage);
        while(chatlog.length > 100) {
          chatlog.shift();
        }
        io.in('chat').emit('messageReceived',newMessage);
        return;
      }
    }
  });
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})