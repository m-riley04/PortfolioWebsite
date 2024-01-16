import './components/ProjectCard'
import ProjectGrid from './components/ProjectGrid';
import Project from './classes/Project';
import NavigationBar from "./components/NavigationBar";
import ProjectList from './components/ProjectList';
import {useEffect, useState} from 'react';

/*
// Project datatype
interface Project {
  name:         string;
  description:  string;
  dateCreated:  string;
  dateUpdated:  string;
  datePushed:   string;
  language:     string;
  topics:       string[];
  url:          string;
  image:        string;
} */

// Read a json value of a Github repository and turn it into a Project object
function jsonToProject(json:object) : Project{
  // Create an array for the topics
  const topics = [];
  for (var i in json) {
    topics.push(json[i]);
  }

  // Create a new Project object with all the JSON data loaded into it
  return new Project(
    json["name"], 
    json["description"],
    json["created_at"],
    json["updated_at"],
    json["pushed_at"],
    json["language"],
    json["topics"],
    json["html_url"],
    "")
}
// Takes a JSON object of repositories and returns a list of Project objects
function parseGithubRepositories(json:object) : Project[] {
  const projects = [];
  for (var i in json) {
    // Convert each JSON to a project object
    const project = jsonToProject(json[i]);
    projects.push(project);
  }

  return projects;
}

function App() {
  
  // Initialize GitHub API
  const [githubData, setGithubData] = useState([]);
  const [githubUser, setGithubUser] = useState("m-riley04");
  const [githubRepos, setGithubRepos] = useState([]);
  const [projects, setProjects] = useState([Project]);

  // Fetch a JSON object of GitHub repositories from a designated user 
  const fetchGithubRepositories = () => {
      fetch(`https://api.github.com/users/${githubUser}/repos`)
      .then((response) => (response.json()))
      .then((data) => {
      setGithubRepos(data);
      setProjects(parseGithubRepositories(data));
      }).catch(() => {
        console.log("ERROR: Failed to fetch GitHub repositories.")
      })
  }
  // Fetch the GitHub data from a designated user
  const fetchGithubData = () => {
      fetch(`https://api.github.com/users/${githubUser}`)
      .then((response) => response.json())
      .then((data) => {
          setGithubData(data);
          const reposUrl = githubData["repos_url"];
          console.log(reposUrl);
      })
  }

  // Fetch the repository once on-render of the page
  useEffect(() => {
      fetchGithubRepositories();
  }, []);

  return (
    <div className="bg-primary">
      <NavigationBar />
      <button onClick={fetchGithubRepositories}>Fetch</button>
      <div className="main-container">
        <ProjectList projects={projects} />
        <div className="container">
          <h1>Repositories</h1>
          <ProjectGrid projects={projects}/>
        </div>
      </div>
    </div>
  );
}

export default App
