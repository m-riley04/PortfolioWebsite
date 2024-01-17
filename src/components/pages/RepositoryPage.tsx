import RepositoryData from '../../classes/RepositoryData'
import RepositoryList from '../repository/RepositoryList';
import {useEffect, useState} from 'react';
import Repository from '../repository/Repository';
import RepositoryGrid from '../repository/RepositoryGrid';

//#region OVERHEAD FUNCTIONS
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
      json["author"],
      json["created_at"],
      json["updated_at"],
      json["pushed_at"],
      json["language"],
      json["topics"],
      json["html_url"],
      json["default_branch"],
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
    const [pageIndex, setPageIndex] = useState(0); 

    // GitHub
    const [githubData, setGithubData] = useState([]);
    const [githubUser, setGithubUser] = useState("m-riley04");
    const [githubRepos, setGithubRepos] = useState([]);
    
    // Data
    const [repositories, setRepositories] = useState([]);
    const [currentRepository, setCurrentRepository] = useState(new RepositoryData);
    const handleRepositoryCardClicked = (e:MouseEvent, data:RepositoryData) => {
        // Set the current data of the repository
        setCurrentRepository(data);
        
        // Set the page to repository viewer
        setPageIndex(1);
    }

    //#endregion

    /**
     * The subpages that are available on the RepositoryPage
     */
    const pages = [
        <RepositoryGrid repos={repositories} onCardClicked={handleRepositoryCardClicked} />,
        <Repository data={currentRepository} />
    ]
    
    //#region TEMPORARY FUNCTIONS
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
    /** Changes between pages for debugging */
    const changePageIndex = () => {
        if (pageIndex === 0) {
            setPageIndex(1);
        } else {
            setPageIndex(0);
        }
    }
    /** Changes to the RepositoryGrid page */
    const changePageToGrid = () => {
        setPageIndex(0);
    }
    /** Changes to the Repository page */
    const changePageToRepository = () => {
        setPageIndex(1);
    }
    //#endregion

    // Fetch the repository once on-render of the page
    useEffect(() => {
        fetchGithubRepositories();
    }, []);

    return (
        <div className="main-container">
            <button onClick={changePageToGrid}>Back to Grid</button>
            <RepositoryList repos={repositories} />
            <div className="container">
                <button onClick={fetchGithubRepositories}>Refresh</button>
                {pages[pageIndex]}
            </div>
        </div>
    );
}

export default RepositoryPage;