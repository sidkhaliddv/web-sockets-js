import React, { useEffect, useState } from "react"
import { ServerInfo } from "../types/ServerInfo"

const useWebSocket = (servers: ServerInfo[], setServers: React.Dispatch<React.SetStateAction<ServerInfo[]>>) => {

  const [connections, setConnections] = useState<WebSocket[]>([])

  useEffect(()=>{
    setServers([])
    connections.forEach((connection)=>{
      if (connection.readyState == connection.CONNECTING){
        connection.onopen = (e)=>{
          connection.send('')
        }
      } else if (connection.readyState == connection.OPEN) {
        connection.send('')
      }
    })
  }, [connections])

  const createConnections = (times: number) => {
    const cncts = [...Array(times)].map(() => {
      const connection = new WebSocket('ws://localhost:8080');
      connection.onmessage = message => receiveMessage(message);
      connection.onclose = event => connectionClosed(event);
      return connection;
    }) as WebSocket[]
    setConnections(oldConnections => [...oldConnections, ...cncts])
  }

  const receiveMessage = (message: any) => {
    const response = JSON.parse(message.data) as {name: string, connections: number};
    setServers((oldServers)=> {
      const serverNames = oldServers.map(({name})=>name);
      if (serverNames.includes(response.name)) {
        return (oldServers).map(oldServer => oldServer.name == response.name ? {name: response.name, connections: oldServer.connections+1} : oldServer)
      }
      return [...oldServers, {name: response.name, connections: 1}];
    })
  }

  const connectionClosed = (event: any) => {
    console.log('connection closed')
    setConnections((oldConnections: WebSocket[])=>{
      return oldConnections.filter((oldConnection) => oldConnection.readyState == oldConnection.OPEN)
    })
  }

  return { createConnections }
}

export default useWebSocket;
