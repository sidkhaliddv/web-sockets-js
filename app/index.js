import { server } from "websocket";
import http from 'http'

let connections = 0

//create http server
const httpServer = http.createServer(function(req, res) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    'Content-Type': 'application/json'
  }

  let url = req.url;
  if (url == '/') {
    res.writeHead(200, headers)
    res.write(JSON.stringify({app: process.env.APPID, connections}))
    res.end()
  }
});

httpServer.listen(8080, () => {
  console.log('server listening on 8080')
});

//create websocket server
const wsServer = new server({
  httpServer: httpServer,
})

wsServer.on('request', (req)=>{
  const connection = req.accept();
  connections++;
  console.log('connections', connections)
  // setInterval(()=>{
    connection.send(JSON.stringify({name: process.env.APPID || 'app1', connections}))
  // }, 5000)
  
  console.log(new Date() + ' - Connection on ' + process.env.APPID + ' from origin - ' + req.origin + ' --accepted ' + req.socket.remoteAddress + ' forwarded address');

  connection.on('message', message => {
    // setInterval(()=>{
    // connection.sendUTF(`Message Received. Message was ${message.utf8Data}`)
    connection.send(JSON.stringify({ name: process.env.APPID }))
    // }, 2000)
  })
  
  connection.on('close', ()=>{
    connections--;
    console.log('connections', connections)
    console.log(`connection closed ${new Date} from ${process.env.APPID}`)
  })

});
