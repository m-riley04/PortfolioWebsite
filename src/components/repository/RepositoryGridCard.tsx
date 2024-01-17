import { useState } from "react";
import RepositoryData from "../../classes/RepositoryData";
/**
* The card that will be displayed within the RepositoryGrid
* @param {RepositoryData} data The repository data, which contains information about a repository.
*/
function RepositoryGridCard({data, onClick} : {data:RepositoryData, onClick?:(e:MouseEvent, data:RepositoryData) => void}) {
    const DEFAULT_REPOSITORY = new RepositoryData();
    const [currentRepository, setCurrentRepository] = useState(DEFAULT_REPOSITORY);
    
    return (
            <div className="card" onClick={() => {
                setCurrentRepository(data);
                console.log(currentRepository)
            }}>
                <img src={data.image} hidden={!data.image}></img>
                <h2>{data.name}</h2>
                <p>{data.description}</p>
            </div>
    );
}

export default RepositoryGridCard;