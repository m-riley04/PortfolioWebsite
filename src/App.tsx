import RepositoryGrid from './components/RepositoryGrid';
import RepositoryData from './classes/RepositoryData'
import NavigationBar from "./components/NavigationBar";
import RepositoryList from './components/RepositoryList';
import {useEffect, useState} from 'react';

//#region App Functions
/**
  * Read a json value of a Github repository and turn it into a Repository object 
  * @param {object} json A json struct object with keys that relate to a GitHub repository (or Repository object)
  * @return {Repository}
 */
function jsonToRepository(json:object) : RepositoryData{
  // Create an array for the topics
  const topics = [];
  for (var i in json) {
    topics.push(json[i]);
  }

  // Create a new Project object with all the JSON data loaded into it
  return new Repository(
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

/** 
 * Takes a JSON object of repositories and returns a list of Project objects
 * @param {object} json A JSON struct object with keys that relate to a GitHub RestAPI array of repositories
 * @return {Repository} A Repository object containing the relevant JSON data
*/ 
function parseGithubRepositories(json:object) : RepositoryData[] {
  const repos = [];
  for (var i in json) {
    // Convert each JSON to a project object
    const project = jsonToRepository(json[i]);
    repos.push(project);
  }

  return repos;
}
//#endregion

function App() {
  //#region STATES
  // Pages
  const [page, setPage] = useState(0);

  // GitHub
  const [githubData, setGithubData] = useState([]);
  const [githubUser, setGithubUser] = useState("m-riley04");
  const [githubRepos, setGithubRepos] = useState([]);

  // Data
  const [repositories, setRepositories] = useState([]);
  //#endregion
  
  //#region FETCHING
  /** Fetch a JSON object of GitHub repositories from a designated user */
  const fetchGithubRepositories = () => {
      fetch(`https://api.github.com/users/${githubUser}/repos`)
      .then((response) => (response.json()))
      .then((data) => {
        setGithubRepos(data);
        setRepositories(parseGithubRepositories(data));
      }).catch(() => {
        console.log("ERROR: Failed to fetch GitHub repositories.");
        return;
      })

      console.log("GitHub repositories fetched successfully.")
  }
  /**  Fetch the GitHub data from a designated user */
  const fetchGithubData = () => {
      fetch(`https://api.github.com/users/${githubUser}`)
      .then((response) => response.json())
      .then((data) => {
          setGithubData(data);
      }).catch(() => {
        console.log("ERROR: Failed to fetch GitHub data.");
        return;
      })

      console.log("GitHub data fetched successfully.")
  }
  //#endregion

  // Fetch the repository once on-render of the page
  useEffect(() => {
      fetchGithubRepositories();
  }, []);

  return (
    <div className="bg-primary">
      <NavigationBar />
      <button onClick={fetchGithubRepositories}>Fetch</button>
      <div className="main-container">
        <RepositoryList repos={repositories} />
        <div className="container">
          <h1>Repositories</h1>
          <RepositoryGrid repos={repositories}/>
        </div>
      </div>
    </div>
  );
}

export default App
