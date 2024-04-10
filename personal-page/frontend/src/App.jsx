import Header from './components/Header.jsx'
import {  Outlet } from 'react-router-dom'

function App() {

  return (
    <div className='h-screen w-screen flex flex-col'>
      <Header />
      <Outlet />
    </div>
  )
}

export default App
