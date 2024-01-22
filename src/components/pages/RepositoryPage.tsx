import RepositoryData from '../../classes/RepositoryData';
import RepositoryList from '../repository/RepositoryList';
import {useEffect, useState, useContext} from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { Outlet } from 'react-router';
import RepositoriesContext from '../contexts/RepositoriesContext';

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
    // Hooks and States
    const { repositories, setRepositories } = useContext(RepositoriesContext);

    // navigate() Init
    const navigate = useNavigate();
    
    /** Fetch a JSON object of GitHub repositories from a designated user */
    const fetchGithubRepositories = () => {
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
        .then((response) => (response.json()))
        .then((data) => {
            setRepositories(parseGithubRepositories(data));
        }).catch((e) => {
            console.log("ERROR: Failed to fetch GitHub repositories.");
            console.log(e.message);
            return;
        })

        console.log("GitHub repositories fetched successfully.")
    }

    // Fetch the repository once on-render of the page
    useEffect(() => {
        fetchGithubRepositories();
    }, []);

    return (
        <motion.div 
            id="repositories"
            className="page-container"
            
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <RepositoryList repos={repositories} />
            <div className="container">
                <button onClick={fetchGithubRepositories}>Refresh</button>
                <button onClick={() => {
                    navigate("repository")
                }}> Repository Page</button>
                <button onClick={() => {
                    navigate("grid")
                }}> Back To Grid</button>
            </div>
            <Outlet/>
        </motion.div>
    );
}

export default RepositoryPage;