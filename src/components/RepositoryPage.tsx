import RepositoryGrid from '../components/repository/RepositoryGrid';
import RepositoryData from '../classes/RepositoryData'
import RepositoryList from '../components/repository/RepositoryList';
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
    return new RepositoryData(
      json["name"], 
      json["description"],
      json["created_at"],
      json["updated_at"],
      json["pushed_at"],
      json["language"],
      json["topics"],
      json["html_url"],
      ""
    );
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
    const repo = jsonToRepository(json[i]);
    repos.push(repo);
}

return repos;
}
//#endregion

function RepositoryPage() {
    //#region STATES
    // Pages

    /**
     * The current page that the website is on.
     * @type {number} An integer representing the current page/component:
     * - 0: Repository Grid
     * - 1: Repository Viewer
     */
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
        }).catch((e) => {
            console.log("ERROR: Failed to fetch GitHub repositories.");
            console.log(e.message);
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
        }).catch((e) => {
            console.log("ERROR: Failed to fetch GitHub data.");
            console.log(e.message);
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
        <div className="main-container">
            <button onClick={fetchGithubRepositories}>Fetch</button>
            <RepositoryList repos={repositories} />
            <div className="container">
                <h1>Repositories</h1>
                <RepositoryGrid repos={repositories}/>
            </div>
        </div>
    );
}

export default RepositoryPage;