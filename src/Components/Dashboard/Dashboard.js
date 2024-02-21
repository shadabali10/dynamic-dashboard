import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [modules, setModules] = useState([]);
  
  useEffect(() => {
    const storedModules = JSON.parse(localStorage.getItem('dashboardModules'));
    if (storedModules) {
      setModules(storedModules);
    } else {
      setModules(defaultModules);
    }
  }, []);
  
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  };
  
  const handleDrop = (e, newIndex) => {
    const oldIndex = e.dataTransfer.getData('index');
    const updatedModules = [...modules];
    const movedModule = updatedModules.splice(oldIndex, 1)[0];
    updatedModules.splice(newIndex, 0, movedModule);
    setModules(updatedModules);
    localStorage.setItem('dashboardModules', JSON.stringify(updatedModules));
  };
  
  const handleRemoveModule = (index) => {
    const updatedModules = modules.filter((_, i) => i !== index);
    setModules(updatedModules);
    localStorage.setItem('dashboardModules', JSON.stringify(updatedModules));
  };
  
  return (
    <div className="dashboard">
      {modules.map((module, index) => (
        <div 
          key={index} 
          className={`module ${module.theme}`} 
          draggable 
          onDragStart={(e) => handleDragStart(e, index)} 
          onDrop={(e) => handleDrop(e, index)} 
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="module-header">
            <span className="module-title">{module.title}</span>
            <button onClick={() => handleRemoveModule(index)}>Remove</button>
          </div>
          <div className="module-content">
            <img src={module.image} alt={module.title} />
          </div>
        </div>
      ))}
    </div>
  );
};

const defaultModules = [
  { title: 'Module 1', image: 'module1.png', theme: 'theme1' },
  { title: 'Module 2', image: 'module2.png', theme: 'theme2' },
  { title: 'Module 3', image: 'module3.png', theme: 'theme3' },
  { title: 'Module 4', image: 'module4.png', theme: 'theme1' },
];

export default Dashboard;
