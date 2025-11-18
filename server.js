const express=require('express');
const http=require('http');
const path=require('path');
const app=express();
const{Server}=require('socket.io');
const server=http.createServer(app);


const io=new Server(server);



const userColors = {};


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.resolve('./public')));




function randomColor() {
  const colors = ["red", "blue", "green", "orange", "purple", "brown"];
  return colors[Math.floor(Math.random() * colors.length)];
}




io.on('connection', (socket) => {
  console.log("User connected:", socket.id);

  // Assign unique color
  userColors[socket.id] = randomColor();

  socket.on('chat message', (msg) => {
    io.emit('chat message', {
    text: msg,
    id: socket.id,
    color: userColors[socket.id]
    });
  });
});



app.get('/', (req, res) => {
  res.sendFile('/public/index.html');
});











server.listen(3000, () => {
  console.log('listening on *:3000');
});