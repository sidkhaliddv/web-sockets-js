import React, { useState } from "react"

const useWebSocket = (servers: {name: string, connections: number}[], setServers: React.Dispatch<React.SetStateAction<{name:string, connections: number}[]>>) => {

  const [connections, setConnections] = useState<WebSocket[]>([])

  const createConnections = (times: number):WebSocket[] => {
    return [...Array(times)].map(() => {
      const connection = new WebSocket('ws://localhost:8080');
      setConnections((conns)=> [...conns, connection]);
      connection.onmessage = message => receiveMessage(message);
      connection.onclose = event => connectionClosed(event);
      return connection;
    })
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
  }

  return { createConnections }
}

export default useWebSocket;
