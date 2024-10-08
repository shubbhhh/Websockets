import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestMessages, setLatestMessages] = useState("");
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send('Hello Server!');
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
      setLatestMessages(message.data);
    }
    setSocket(newSocket);
    return () => newSocket.close();
  }, [])

  if (!socket) {
    return <>
      CONNECTING TO SOCKET SERVER...
    </>
  }

  return (
    <div>
      <input type="text" onChange={(e) => setUserMessage(e.target.value)}/>
      <button
        onClick={() => socket.send(userMessage)}
      >
        Send
      </button>
      <div>
        {latestMessages}
      </div>
    </div>
  )
}

export default App;