import React, { useState, useEffect } from 'react';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ id: '', title: '', description: '', URL: '' });
  const [updateProject, setUpdateProject] = useState({ id: '', newId: '', title: '', description: '', URL: '' });
  const [deleteProjectId, setDeleteProjectId] = useState('');

  useEffect(() => {
    fetch('/API')
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  const handleAddProject = () => {
    fetch(`/API?id=${newProject.id}&title=${newProject.title}&description=${newProject.description}&URL=${newProject.URL}`, {
      method: 'POST'
    })
      .then(res => res.text())
      .then(data => {
        alert(data);
        setProjects([...projects, newProject]);
        setNewProject({ id: '', title: '', description: '', URL: '' });
      })
      .catch(err => console.error(err));
  };

  const handleUpdateProject = () => {
    fetch(`/API?id=${updateProject.id}&newId=${updateProject.newId}&title=${updateProject.title}&description=${updateProject.description}&URL=${updateProject.URL}`, {
      method: 'PUT'
    })
      .then(res => res.text())
      .then(data => {
        alert(data);
        const index = projects.findIndex(project => project.id === updateProject.id);
        const updatedProjects = [...projects];
        updatedProjects[index] = { id: updateProject.newId, title: updateProject.title, description: updateProject.description, URL: updateProject.URL };
        setProjects(updatedProjects);
        setUpdateProject({ id: '', newId: '', title: '', description: '', URL: '' });
      })
      .catch(err => console.error(err));
  };

  const handleDeleteProject = () => {
    fetch(`/API?id=${deleteProjectId}`, {
      method: 'DELETE'
    })
      .then(res => res.text())
      .then(data => {
        alert(data);
        const filteredProjects = projects.filter(project => project.id !== deleteProjectId);
        setProjects(filteredProjects);
        setDeleteProjectId('');
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <a href={project.URL}>{project.URL}</a>
          </li>
        ))}
      </ul>
      <div className="forms">
      <form>
      <h2>Add Project</h2>
      <label htmlFor="add-id">Project number:</label>
      <input type="text" id="add-id" value={newProject.id} onChange={e=> setNewProject({ ...newProject, id: e.target.value })} />
<br />
<label htmlFor="add-title">Title:</label>
<input type="text" id="add-title" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} />
<br />
<label htmlFor="add-description">Description:</label>
<input type="text" id="add-description" value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} />
<br />
<label htmlFor="add-URL">URL:</label>
<input type="text" id="add-URL" value={newProject.URL} onChange={e => setNewProject({ ...newProject, URL: e.target.value })} />
<br />
<button onClick={handleAddProject}>Add Project</button>
</form>
<form>
<h2>Update Project</h2>
  <label htmlFor="update-id">Project number:</label>
  <input type="text" id="update-id" value={updateProject.id} onChange={e => setUpdateProject({ ...updateProject, id: e.target.value })} />
  <br />
  <label htmlFor="update-title">Title:</label>
  <input type="text" id="update-title" value={updateProject.title} onChange={e => setUpdateProject({ ...updateProject, title: e.target.value })} />
  <br />
  <label htmlFor="update-description">Description:</label>
  <input type="text" id="update-description" value={updateProject.description} onChange={e => setUpdateProject({ ...updateProject, description: e.target.value })} />
  <br />
  <label htmlFor="update-URL">URL:</label>
  <input type="text" id="update-URL" value={updateProject.URL} onChange={e => setUpdateProject({ ...updateProject, URL: e.target.value })} />
  <br />
  <button onClick={handleUpdateProject}>Update Project</button>
  </form>
  <form>
  <h2>Delete Project</h2>
  <label htmlFor="delete-id">Project number:</label>
  <input type="text" id="delete-id" value={deleteProjectId} onChange={e => setDeleteProjectId(e.target.value)} />
  <br />
  <button onClick={handleDeleteProject}>Delete Project</button>
  </form>
  </div>
</div>
);
}

export default Projects;
