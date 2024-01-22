import RepositoryData from "../../classes/RepositoryData";
import { useContext } from "react";
import CurrentRepositoryContext from "../contexts/CurrentRepositoryContext";
import RepositoriesPageContext from "../contexts/RepositoriesPageContext";
import { motion } from "framer-motion";

interface CardAnimations {
    delay: number,
    duration: number
}

/**
* The card that will be displayed within the RepositoryGrid
* @param {RepositoryData} data The repository data, which contains information about a repository.
*/
function RepositoryGridCard({ data, animations } : {data:RepositoryData, animations?:CardAnimations}) {
    // Get contexts of parent page and the currently selected repository
    const { setCurrentRepository } = useContext(CurrentRepositoryContext);
    const { setPage } = useContext(RepositoriesPageContext);

    return (
            <motion.div 
                className="card clickable" 

                transition={{
                    delay: animations?.delay,
                    duration: animations?.duration
                }}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                
                onClick={() => {
                    setCurrentRepository(data);
                    setPage("repository");
                    console.log(`Selected Repository: ${data}`);
                }}
                >
                <img src={data.image} hidden={!data.image}></img>
                <h2>{data.name}</h2>
                <p>{data.description}</p>
            </motion.div>
    );
}

export default RepositoryGridCard;