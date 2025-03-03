import { server } from "websocket";
import { createClient } from "redis";

import http from 'http'

let connections = 0

const redis = await createClient({
  url: 'redis://redis:6379'
}).connect()

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
  if (url == '/all') {
    res.writeHead(200, { 'content-type': 'text/event-stream', 'access-control-allow-origin': '*' })
    setInterval(async ()=>{
      const connInfo = await redis.hGetAll('connections-info')
      res.write(`data: ${JSON.stringify(connInfo)} \n\n`)
    }, 3000)
  }
});

httpServer.listen(8080, () => {
  console.log('server listening on 8080')
});

//create websocket server
const wsServer = new server({
  httpServer: httpServer,
})

wsServer.on('request', async (req) => {
  const connection = req.accept();
  connections++;
  await redis.hSet('connections-info',
                   process.env.APPID, connections)
  const connInfo = await redis.hGetAll('connections-info')
  console.log(connInfo)
  connection.on('message', message => {
    connection.send(JSON.stringify({ name: process.env.APPID, flag: message.utf8Data }))
  })
  
  connection.on('close', async ()=>{
    connections--;
    await redis.hSet('connections-info',
      process.env.APPID, connections)
    const connInfo = await redis.hGetAll('connections-info')
    console.log(connInfo)
  })

});
