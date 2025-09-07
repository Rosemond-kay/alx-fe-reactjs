import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WelcomeMessage from './components/WelcomeMessage'
import Header from './Header'
import MainContent from './MainContent'
import Footer from './Footer'
function App() {
  const [count, setCount] = useState(0)

   return (
    <>
      <Header />
      <MainContent />
      <Footer />
    </>
  )
}

export default App
