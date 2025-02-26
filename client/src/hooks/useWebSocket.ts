import React, { useEffect, useRef, useState } from "react"
import { ServerInfo } from "../types/ServerInfo"

const useWebSocket = (servers: ServerInfo[], setServers: React.Dispatch<React.SetStateAction<ServerInfo[]>>) => {
  const [connections, setConnections] = useState<WebSocket[]>([])
  const flag = useRef<number>(0)

  useEffect(() => {
    flag.current = flag.current + 1;
    setServers([])
    connections.forEach((connection)=>{
      if (connection.readyState == connection.CONNECTING){
        connection.onopen = (e)=>{
          connection.send(flag.current.toString())
        }
      } else if (connection.readyState == connection.OPEN) {
        connection.send(flag.current.toString())
      }
    })
  }, [connections])

  const createConnections = (times: number) => {
    const cncts = [...Array(times)].map(() => {
      const connection = new WebSocket('ws://localhost:8080');
      connection.onmessage = (message) => receiveMessage(message);
      connection.onclose = event => connectionClosed(event);
      return connection;
    }) as WebSocket[]
    
    setConnections(oldConnections => [...oldConnections, ...cncts])
  }

  const receiveMessage = (message: any) => {
    const response = JSON.parse(message.data) as {name: string, flag: string};
    if (parseInt(response.flag) !== flag.current) {
      return
    }
    setServers((oldServers) => {
      const serverNames = oldServers.map(({name})=>name);
      if (serverNames.includes(response.name)) {
        return (oldServers).map(oldServer => oldServer.name == response.name ? {name: response.name, connections: oldServer.connections+1} : oldServer)
      }
      return [...oldServers, {name: response.name, connections: 1}];
    })
  }

  const connectionClosed = (event: any) => {
    setConnections((oldConnections: WebSocket[])=>{
      return oldConnections.filter((oldConnection) => oldConnection.readyState == oldConnection.OPEN)
    })
  }

  return { createConnections }
}

export default useWebSocket;
