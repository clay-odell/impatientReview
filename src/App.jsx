import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import HomePage from "./components/HomePage"
function App() {
  

  return (
    <Router>
      <NavBar />
        <Routes className="bg-slate-100 dark:bg-slate-950">
          <Route path="/" element={<HomePage />}/>
        </Routes>
    </Router>
  )
}

export default App
