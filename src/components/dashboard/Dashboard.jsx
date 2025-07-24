import { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import TechSelector from './TechSelector';
import SkillProgress from './SkillProgress';

function Dashboard({ user }) {
  const [stats, setStats] = useState({
    totalCourses: 12,
    completedAssignments: 8,
    averageScore: 85,
    studyHours: 24
  });

  const [selectedTech, setSelectedTech] = useState('');
  const [skills, setSkills] = useState({});

  const techOptions = ['React', 'Vue', 'Angular', 'JavaScript', 'Python', 'Java', 'NodeJS'];

  const skillsData = {
    react: { react: 70, javascript: 85, css: 75, nodejs: 60 },
    vue: { vue: 80, javascript: 85, css: 75, nodejs: 65 },
    angular: { angular: 75, typescript: 80, css: 70, nodejs: 60 },
    javascript: { javascript: 90, html: 85, css: 80, dom: 75 },
    python: { python: 85, django: 70, flask: 65, sql: 75 },
    java: { java: 80, spring: 70, hibernate: 65, sql: 75 },
    nodejs: { nodejs: 85, express: 80, mongodb: 70, javascript: 90 }
  };

  useEffect(() => {
    if (selectedTech) {
      const techSkills = skillsData[selectedTech.toLowerCase()] || {};
      setSkills(techSkills);
    } else {
      setSkills({});
    }
  }, [selectedTech]);

  const handleTechChange = (event) => {
    setSelectedTech(event.target.value);
  };

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h1 className="welcome-title">
          Welcome back, {user || 'Student'}! 👋
        </h1>
        <p className="welcome-subtitle">
          Track your learning progress and explore new technologies to enhance your skills.
        </p>
      </div>

      <div className="stats-grid">
        <StatsCard
          title="Total Courses"
          value={stats.totalCourses}
          icon="📚"
          color="primary"
          trend={8}
          delay={0}
        />
        <StatsCard
          title="Completed Assignments"
          value={stats.completedAssignments}
          icon="✅"
          color="success"
          trend={12}
          delay={200}
        />
        <StatsCard
          title="Average Score"
          value={`${stats.averageScore}%`}
          icon="🎯"
          color="warning"
          trend={5}
          delay={400}
        />
        <StatsCard
          title="Study Hours"
          value={stats.studyHours}
          icon="⏰"
          color="info"
          trend={-3}
          delay={600}
        />
      </div>

      <TechSelector
        options={techOptions}
        selectedOption={selectedTech}
        onSelectionChange={handleTechChange}
      />

      {Object.keys(skills).length > 0 && (
        <SkillProgress skills={skills} />
      )}
    </div>
  );
}

export default Dashboard;