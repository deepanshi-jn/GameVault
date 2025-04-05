import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import GameDetailPage from './pages/GameDetailPage'
import LibraryPage from './pages/LibraryPage'
import './App.css'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:id" element={<GameDetailPage />} />
          <Route path="/library" element={
            <>
              <SignedIn>
                <LibraryPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App