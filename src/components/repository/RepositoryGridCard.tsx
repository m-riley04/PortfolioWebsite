import RepositoryData from "../../classes/RepositoryData";
import { useContext } from "react";
import CurrentRepositoryContext from "../contexts/CurrentRepositoryContext";
import RepositoriesPageContext from "../contexts/RepositoriesPageContext";

/**
* The card that will be displayed within the RepositoryGrid
* @param {RepositoryData} data The repository data, which contains information about a repository.
*/
function RepositoryGridCard({data} : {data:RepositoryData}) {
    // Get contexts of parent page and the currently selected repository
    const {currentRepository, setCurrentRepository} = useContext(CurrentRepositoryContext);
    const {page, setPage} = useContext(RepositoriesPageContext);
    
    return (
            <div className="card clickable" onClick={() => {
                setCurrentRepository(data);
                setPage("#repository");
                console.log(data);
            }}>
                <img src={data.image} hidden={!data.image}></img>
                <h2>{data.name}</h2>
                <p>{data.description}</p>
            </div>
    );
}

export default RepositoryGridCard;