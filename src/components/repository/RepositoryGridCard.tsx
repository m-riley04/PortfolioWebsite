import RepositoryData from "../../classes/RepositoryData";
import { useContext } from "react";
import { useNavigate } from "react-router";
import CurrentRepositoryContext from "../contexts/CurrentRepositoryContext";

/**
* The card that will be displayed within the RepositoryGrid
* @param {RepositoryData} data The repository data, which contains information about a repository.
*/
function RepositoryGridCard({data} : {data:RepositoryData}) {

    const { currentRepository, setCurrentRepository } = useContext(CurrentRepositoryContext);

    const navigate = useNavigate();

    return (
            <div className="card clickable" onClick={() => {
                navigate("../repository");
                setCurrentRepository(data);
                console.log(`Selected Repository: ${currentRepository}`);
            }}>
                <img src={data.image} hidden={!data.image}></img>
                <h2>{data.name}</h2>
                <p>{data.description}</p>
            </div>
    );
}

export default RepositoryGridCard;