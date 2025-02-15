import { ReactElement, useState } from "react";
import CreateConnection from "./CreateConnection";
import ServerList from "./ServerList";
import { ServerInfo } from "../types/ServerInfo";

const Simulator = ():ReactElement => {
  const [servers, setServers] = useState<ServerInfo[]>([])
  console.log('called simualtor', servers)
  return (
    <>
      <CreateConnection servers={servers} setServers={setServers} />
      <ServerList servers={servers} />
    </>
  )
}

export default Simulator;
