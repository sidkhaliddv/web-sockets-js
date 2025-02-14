import { ReactElement } from "react"
import ServerConnectionInfo from "./ServerConnectionInfo";
import { ServerInfo } from "../types/ServerInfo";

const ServerList = ({servers}: {servers: ServerInfo[]}):ReactElement => {

  return (<>
    { servers.length>0 && servers.map(server=>(
      <ServerConnectionInfo key={server.name} serverInfo={server} />
    )) }
  </>)
}

export default ServerList;
