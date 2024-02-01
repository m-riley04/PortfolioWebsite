import { useContext } from "react";
import CurrentRepositoryContext from "../contexts/CurrentRepositoryContext";
import RepositoriesPageContext from "../contexts/RepositoriesPageContext";
import { motion } from "framer-motion";
import { Repository } from "../../graphql/Query.ts";

interface CardAnimations {
    delay: number,
    duration: number
}

/**
* The card that will be displayed within the RepositoryGrid
* @param {RepositoryData} data The repository data, which contains information about a repository.
*/
function RepositoryGridCard({ repo, animations } : {repo?:Repository, animations?:CardAnimations}) {
    // Get contexts of parent page and the currently selected repository
    const { setCurrentRepository } = useContext(CurrentRepositoryContext);
    const { setPage } = useContext(RepositoriesPageContext);
    let classes = "card clickable";

    if (repo?.featured) {
        classes = "card clickable featured";
    } else {
        classes = "card clickable";
    }

    return (
        <motion.div 
            className={classes}

            transition={{
                delay: animations?.delay,
                duration: animations?.duration
            }}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            
            onClick={() => {
                if (repo) {
                    setCurrentRepository(repo);
                }
                setPage("repository");
                console.log(`Selected Repository: ${repo?.name}`);
            }}
        >
            <img src={repo?.openGraphImageUrl} hidden={!repo?.openGraphImageUrl}></img>
            <h2>{repo?.name}</h2>
            <p>{repo?.description}</p>
        </motion.div>
    );
}

export default RepositoryGridCard;