import RepositoryData from '../../classes/RepositoryData';
import RepositoryList from '../repository/RepositoryList';
import {useEffect, useState} from 'react';
import Repository from '../repository/Repository';
import RepositoryGrid from '../repository/RepositoryGrid';
import RepositoriesPageContext from '../contexts/RepositoriesPageContext';
import RepositoriesPageSwitcher from '../switchers/RepositoriesPageSwitcher.tsx';
import CurrentRepositoryContext from '../contexts/CurrentRepositoryContext.ts';
import { motion } from 'framer-motion';

// CONSTANTS
const GITHUB_USERNAME = "m-riley04";

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
      topics.push(json[i as keyof object]);
    }
  
    // Create a new Project object with all the JSON data loaded into it
    return new RepositoryData(
      json["name" as keyof object], 
      json["description" as keyof object],
      json["owner" as keyof object]["login" as keyof object],
      json["created_at" as keyof object],
      json["updated_at" as keyof object],
      json["pushed_at" as keyof object],
      json["language" as keyof object],
      json["topics" as keyof object],
      json["html_url" as keyof object],
      json["default_branch" as keyof object],
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
    const repo = jsonToRepository(json[i as keyof object]);
    repos.push(repo);
}

return repos;
}
//#endregion

function RepositoryPage() {
    //#region STATES
    // GitHub
    const [githubData, setGithubData] = useState([]);
    const [githubUser, setGithubUser] = useState(GITHUB_USERNAME);
    const [githubRepos, setGithubRepos] = useState([]);
    
    // Data
    const [repositories, setRepositories] = useState([]);
    //#endregion

    // Pages
    const [currentRepository, setCurrentRepository] = useState(new RepositoryData());
    const currentRepositoryValue = {currentRepository, setCurrentRepository};
    
    /**
     * @type {string : JSX.Element} A map of the subpages within the RepositoryPage
     * @param {string} name A string of the page's target name
     * @param {JSX.Element} value A JSX element that contains the page's info
     * 
     * Current pages:
     * - #grid - the repository grid
     * - #repository - the repository viewer
     */
    const pages : {[name : string] : JSX.Element} = {
        "#grid": <RepositoryGrid repos={repositories}/>,
        "#repository": <Repository data={currentRepository} />
    }

    const [page, setPage] = useState("#grid");
    const pageValue = {page, setPage}
    
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
    //#endregion

    // Fetch the repository once on-render of the app
    useEffect(() => {
        fetchGithubRepositories();
    }, []);

    return (
        <RepositoriesPageContext.Provider value={pageValue}>
            <CurrentRepositoryContext.Provider value={currentRepositoryValue}>
                <motion.div 
                    className="page-container"
                    
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
                    <RepositoryList repos={repositories} />
                    <div className="container">
                        <button onClick={fetchGithubRepositories}>Refresh</button>
                        <RepositoriesPageSwitcher title="Repository Grid" target="#grid" />
                        {pages[pageValue.page]}
                    </div>
                </motion.div>
            </CurrentRepositoryContext.Provider>
        </RepositoriesPageContext.Provider>
    );
}

export default RepositoryPage;