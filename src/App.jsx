import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { LeftSidebar } from './components/LeftSidebar'
import { RightSidebar } from './components/RightSidebar'
import { Feed } from './components/Feed'
import { DashboardPage } from './pages/DashboardPage'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="fb-app">
            <Header />
            <div className="fb-layout">
              <LeftSidebar />
              <Feed />
              <RightSidebar />
            </div>
          </div>
        }
      />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}

export default App
