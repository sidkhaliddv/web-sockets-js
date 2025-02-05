const useWebSocket = () => {
  const createConnections = (times: number) => {
    [...Array(times)].forEach(() => {
      const connection = new WebSocket('ws://localhost:8080')
      connection.onmessage = message => { console.log(message.data) }
    })
  }

  return { createConnections }
}

export default useWebSocket;
