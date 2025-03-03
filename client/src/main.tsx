import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Simulator from './components/Simulator.tsx'
import AllConnectionsInfo from './components/AllConnectionsInfo.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Simulator />} />
        <Route path='/all' element = {<AllConnectionsInfo/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
