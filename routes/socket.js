module.exports =function(_server){

   const io = require('socket.io')(server);

   io.json('connection', function(socket){

      socket.on('message',function(data){
         noenviar == false;
         socket.emit('callback',noenviar);
      });

   });
}