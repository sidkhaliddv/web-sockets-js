import React, { ReactElement, useState } from "react";
import useWebSocket from "../hooks/useWebSocket";

const CreateConnection = ({servers, setServers}: {servers: {name: string, connections: number}[], setServers: React.Dispatch<React.SetStateAction<{name:string, connections: number}[]>>}):ReactElement => {
  const { createConnections } = useWebSocket(servers, setServers)
  const [connections, setConnections] = useState(0)
  const handleSubmit = (e: any) => {
    e.preventDefault()
    createConnections(connections);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="number" value={connections} onChange={e=>setConnections(parseInt(e.target.value))} />
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default CreateConnection;
