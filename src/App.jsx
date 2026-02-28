import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects' 
import Board from './pages/Board' 
import ProjectDetail from './pages/ProjectDetail'
import Resources from './pages/Resources'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />  
        <Route path="/board" element={<Board />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/resources" element={<Resources />} />  
        {/* Future: /board, /sprints, etc. */}
      </Route>
    </Routes>
  )
}

export default App