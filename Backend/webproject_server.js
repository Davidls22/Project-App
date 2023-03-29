const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Utility function - gets project data, and creates the file if it doesn't exist
function getProjects() {
  try {
    const content = fs.readFileSync('webprojects.json');
    return JSON.parse(content);
  } catch (error) {
    // File doesn't exist - create it with an empty array
    fs.writeFileSync('webprojects.json', '[]');
    return [];
  }
}

//function for deleting a project by id
function deleteProject(id) {
  const projects = getProjects();
  let projectIndex = -1;
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id === id) {
      projectIndex = i;
      break;
    }
  }
  if (projectIndex !== -1) {
    projects.splice(projectIndex, 1);
    fs.writeFileSync('webprojects.json', JSON.stringify(projects));
    return true;
  }
  return false;
}

function addProjects(newProject){
  const projects = getProjects()
  projects.push(newProject)
  fs.writeFileSync('webprojects.json', JSON.stringify(projects))
}


// gets the web project objects
app.get('/API', (req, resp) => {
  resp.sendFile(__dirname + '/webprojects.json');
});

// delete project
app.delete('/API/', (req, resp) => {
  const id = req.query.id;
  if (deleteProject(id)) {
    resp.send('Success, deleted project');
  } else {
    resp.send('Project does not exist');
  }
});

// create new person
app.post('/API/', (req, resp)=>{
  const { id, title, description, URL } = req.query
  const projects = getProjects()
  if (projects.find(project => project.id === id)){
      resp.send('Project already exists')
  } else {
      const newProject = { id, title, description, URL }
      addProjects(newProject)
      resp.send('Success, added project')
  }
})

// update project
app.put('/API/', (req, resp) => {
  const id = req.query.id;
  const { newId, title, description, URL } = req.query;
  const projects = getProjects();
  const projectIndex = projects.findIndex((project) => project.id === id);
  if (projectIndex !== -1) {
    const updatedProject = { id: newId, title, description, URL };
    projects[projectIndex] = updatedProject;
    fs.writeFileSync('webprojects.json', JSON.stringify(projects));
    resp.send('Success, updated project');
  } else {
    resp.send('Project does not exist');
  }
});



app.listen(port, ()=>console.log('Listening engaged'))

/* help from mentor 1-1 call with the functions for this task
also used these resources:

https://www.tabnine.com/code/javascript/functions/express/Express/post
https://www.tabnine.com/code/javascript/classes/express/ParamsDictionary
https://www.javascripttutorial.net/es6/javascript-array-findindex/

*/