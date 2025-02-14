import { ReactElement, useEffect, useState } from "react";
import { ServerInfo } from "../types/ServerInfo";

type PropsType = {
  serverInfo: ServerInfo
}

const ServerConnectionInfo = ({serverInfo}: PropsType):ReactElement => {
  return (
    <>
      <div className="max-w-sm shadow-lg rounded bg-gray-50 border appearance-none h-30">
        <div>
          <h1>Server Name: {serverInfo.name}</h1>
        </div>
        <div>
          <p>Total Active connections: <i className="text-blue-400">{serverInfo.connections}</i></p>
        </div>
      </div>
    </>
  )
}

export default ServerConnectionInfo;
