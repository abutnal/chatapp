const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const router = require('./router/router');
const nodemailer = require("nodemailer");
const io = require('socket.io').listen(server);


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))

app.use(router);


const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
	console.log(`We are live on PORT ${PORT}`);
})


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'arjun.provabmail@gmail.com',
    pass: 'Iforgotten'
  }
});




io.on('connection', (socket)=>{
  const users = {}
  socket.on('new-user', name=>{
   users[socket.id] = name;
   socket.broadcast.emit('user-connected', name);
 })

  socket.on('user-email', (email, name)=>{
            // console.log(email);
            // console.log(name);

            
            var mailOptions = {
              from: 'AB UTNAL',
  // sender: 'AB UTNAL', 
  to: 'utnal.ab@gmail.com',
  subject: `Support: user requisted for chat`,
  html: `<h1>User Detials:</h1><p>Name: ${name}</p> <p> Email: ${email}<p/>`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});


});
  socket.on('send-chat-message', message=>{
    socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]})
  })
  
  socket.on('disconnect', ()=>{
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})