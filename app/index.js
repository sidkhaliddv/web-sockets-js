import { server } from "websocket";
import http from 'http'

//create http server
const httpServer = http.createServer();

httpServer.listen(8080, ()=>{
  console.log('server listening on 8080')
});

//create websocket server
const wsServer = new server({
  httpServer: httpServer,
})

wsServer.on('request', (req)=>{
  const connection = req.accept();
  console.log(new Date() + ' - Connection from origin - ' + req.origin + ' --accepted '+ req.socket.remoteAddress+ ' forwarded address');
  connection.on('message', message => {
    console.log(`Received message ${message.utf8Data}`)
  })
  connection.on('close', ()=>{
    console.log(`connection closed ${new Date}`)
  })
});
