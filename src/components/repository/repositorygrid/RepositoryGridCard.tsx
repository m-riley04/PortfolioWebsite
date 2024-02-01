import { useContext } from "react";
import CurrentRepositoryContext from "../../contexts/CurrentRepositoryContext.ts";
import RepositoriesPageContext from "../../contexts/RepositoriesPageContext.ts";
import { motion } from "framer-motion";
import { Repository } from "../../../graphql/Query.ts";

/** The properties of a card's animations */
interface CardAnimations {
    delay: number,
    duration: number
}

/**
* The card that will be displayed within the RepositoryGrid
* @param {Repository} repo The repository data, which contains information about a repository.
* @param {CardAnimations} animations The properties for the animation of the framer-motion div container
* @returns a card that displays some information about a repository
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