import { useEffect, useState } from "react";
import ServerConnectionInfo from "./ServerConnectionInfo";


const AllConnectionsInfo = () => {
  const [allServers, setAllServers] = useState<any>(null)
  useEffect(()=>{
    const sse = new EventSource('http://localhost:8080/all')
    sse.onmessage = message => {
      setAllServers(JSON.parse(message.data))
    }
  }, [])
  return (
    <>
    { allServers ? 
      <>
        { allServers && 'Total Connections: '+ Object.values(allServers).reduce((accumulator: any, currentValue: any)=> parseInt(accumulator)+parseInt(currentValue), 0)}
        {allServers && Object.keys(allServers).map((server)=>(
          <ServerConnectionInfo key={server} serverInfo={{name: server, connections: parseInt(allServers[server])}} />
        ))}
      </>
     : 'Total Connections: 0'}
    </>
  )
}

export default AllConnectionsInfo;
