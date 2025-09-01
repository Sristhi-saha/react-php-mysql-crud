import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from './components/header'
import { Home } from './components/home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar />
     <Home />
    </>
  )
}

export default App
