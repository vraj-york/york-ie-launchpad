import './App.css'
import { Header } from './components/Header'
import { LeftSidebar } from './components/LeftSidebar'
import { RightSidebar } from './components/RightSidebar'
import { Feed } from './components/Feed'

function App() {
  return (
    <div className="fb-app">
      <Header />
      <div className="fb-layout">
        <LeftSidebar />
        <Feed />
        <RightSidebar />
      </div>
    </div>
  )
}

export default App
