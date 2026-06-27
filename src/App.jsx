import { useState } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import Header from './components/Header';
import Profile from './components/Profile';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Certifications from './components/Certifications';
import ProjectModal from './components/ProjectModal';
import AllProjectsModal from './components/AllProjectsModal';
import portfolioData from './data/data.json';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAllProjectsOpen, setIsAllProjectsOpen] = useState(false);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenAllProjects = () => {
    setIsAllProjectsOpen(true);
  };

  const handleCloseAllProjects = () => {
    setIsAllProjectsOpen(false);
  };

  return (
    <>
      {/* 3D Wireframe Canvas Background */}
      <BackgroundCanvas />

      {/* Main Dashboard Layout */}
      <main className="main-container">
        <div className="sub-container">
          <Header personalInfo={portfolioData.personalInfo} />
          
          <div className="container">
            <Profile summary={portfolioData.summary} />
            <Experience experience={portfolioData.experience} />
            <Projects
              projects={portfolioData.projects}
              onOpenModal={handleOpenModal}
              onViewAll={handleOpenAllProjects}
            />
            <Skills skills={portfolioData.skills} />
            <Education education={portfolioData.education} />
            <Certifications certifications={portfolioData.certifications} />
          </div>
        </div>
      </main>

      {/* Detail View Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={handleCloseModal}
      />

      {/* All Projects Modal with Category Tabs */}
      <AllProjectsModal
        isOpen={isAllProjectsOpen}
        onClose={handleCloseAllProjects}
        onOpenProject={handleOpenModal}
      />
    </>
  );
}
