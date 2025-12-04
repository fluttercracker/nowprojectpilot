import './App.css'
import ProjectsPage from './projects/projectsPage'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router';
import HomePage from './home/HomePage';
import ProjectPage from './projects/ProjectPage';

function App() {
  const logoSrc = `${import.meta.env.BASE_URL}assets/logo-3.svg`

  return (
    <BrowserRouter basename="/nowprojectpilot">
      <header className="sticky">
        <span className="logo">
          <img src={logoSrc} alt="logo" width="49" height="99" />
        </span>
        <NavLink to="/" className="button rounded">
          <span className="icon-home"></span>
          Home
        </NavLink>
        <NavLink to="/projects" className="button rounded">
          Projects
        </NavLink>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );

}

export default App