import RepositoryData from '../../classes/RepositoryData';
import RepositoryList from '../repository/RepositoryList';
import { useEffect, useState, useRef } from 'react';
import Repository from '../repository/Repository';
import RepositoryGrid from '../repository/RepositoryGrid';
import RepositoriesPageContext from '../contexts/RepositoriesPageContext';
import CurrentRepositoryContext from '../contexts/CurrentRepositoryContext.ts';
import { motion } from 'framer-motion';
//import DummyRepositories from '../../testing/DummyRepositories.ts';

// CONSTANTS
//** The GitHub username to search for repositories under */
const GITHUB_USERNAME = "m-riley04";
//** A list of repository names that will not appear on the site */
const BLACKLIST:string[] = [
    "FAP"
];
//** A list of repository names that will be given the "featured" tag */
const FEATURED:string[] = [
    "AutoSortFolder"
];

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

/** Fetch a JSON object of GitHub repositories from a designated user */
const fetchGithubRepositories = (username:string) => {
    const reposUrl = `https://api.github.com/users/${username}/repos`
    return fetch( reposUrl )
        .then((response) => (response.json()));
}
  
/** 
 * Takes a JSON object of repositories and returns a list of Project objects
 * @param {object} json A JSON struct object with keys that relate to a GitHub RestAPI array of repositories
 * @return {Repository} A Repository object containing the relevant JSON data
 */ 
function parseGithubRepositories(json:object) : RepositoryData[] {
    const repos = [];
    for (var i in json) {
        const repoJson = json[i as keyof object];

        // Check if the repo is blacklisted
        if (BLACKLIST.includes(repoJson["name"])) {
            console.log(`${repoJson["name"]} is blacklisted. Skipping...`)
            continue;
        }

        // Convert the JSON to a Repository object
        const repo = jsonToRepository(repoJson);

        // Check if the repo is in the featured list
        if (FEATURED.includes(repo.name)) {
            console.log(`${repoJson["name"]} is featured!. Highlighting...`)
            repo.featured = true;
        }

        // Push the repo to the array
        repos.push(repo);
    }

    return repos;
}

function RepositoryPage() {
    //=== References
    const ref = useRef<HTMLDivElement>(null);

    //=== Hooks and States
    const [repositories, setRepositories] = useState([new RepositoryData()]);
    const [currentRepository, setCurrentRepository] = useState(new RepositoryData());
    const currentRepositoryValue = {currentRepository, setCurrentRepository};
    const [page, setPage] = useState("grid");
    const pageValue = {page, setPage}

    /**
     * @type {string : JSX.Element} A map of the subpages within the RepositoryPage
     * @param {string} name A string of the page's target name
     * @param {JSX.Element} value A JSX element that contains the page's info
     * 
     * Current pages:
     * - grid - the repository grid
     * - repository - the repository viewer
     */
    const pages : {[name : string] : JSX.Element} = {
        "grid": <RepositoryGrid repos={repositories}/>,
        "repository": <Repository data={currentRepository} parent={ref} />
    }

    const handleRefresh = () => {
        fetchGithubRepositories(GITHUB_USERNAME)
            .then((data) => {
                setRepositories(parseGithubRepositories(data));
            }).catch((e) => {
                console.error(`Failed to fetch GitHub repositories: ${e}`);
                return;
            })
    }

    // Fetch the repository once on-render of the app
    useEffect(() => {
        //setRepositories(DummyRepositories);
        handleRefresh()
    }, []);

    return (
        <RepositoriesPageContext.Provider value={pageValue}>
            <CurrentRepositoryContext.Provider value={currentRepositoryValue}>
                <motion.div 
                    id="repositories"
                    ref={ref}

                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
                    <RepositoryList repos={repositories} />
                    <div className="container">
                        <button onClick={handleRefresh}>Refresh</button>
                        {pages[pageValue.page]}
                    </div>
                </motion.div>
            </CurrentRepositoryContext.Provider>
        </RepositoriesPageContext.Provider>
    );
}

export default RepositoryPage;