import React, { ReactElement, useState } from "react";
import useWebSocket from "../hooks/useWebSocket";

const CreateConnection = ({servers, setServers}: {servers: {name: string, connections: number}[], setServers: React.Dispatch<React.SetStateAction<{name:string, connections: number}[]>>}):ReactElement => {
  const { createConnections } = useWebSocket(servers, setServers)

  const [cnts, setcnts] = useState(0)
  const handleSubmit = (e: any) => {
    e.preventDefault()
    createConnections(cnts);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="number" value={cnts} onChange={e=>setcnts(parseInt(e.target.value))} />
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default CreateConnection;
