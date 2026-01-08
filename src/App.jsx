import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import HomePage from "./components/HomePage"
import AboutPage from "./components/AboutPage"
import WritingsPage from "./components/WritingsPage"
import NotFound from "./components/NotFound"
import AdminLoginPage from "./components/AdminLoginPage"
import AdminDashboard from "./components/AdminDashboard"

function App() {
  

  return (
    <Router>
      <NavBar />
        <Routes className="bg-slate-100 dark:bg-slate-950">
          <Route path="/" element={<HomePage />}/>
          <Route path="/about" element={<AboutPage />}/>
          <Route path="/writings" element={<WritingsPage />}/>
          <Route path="/admin-login" element={<AdminLoginPage />}/>
          <Route path="/admin-dashboard" element={<AdminDashboard />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
    </Router>
  )
}

export default App
