import RepositoryData from "../../classes/RepositoryData";

/**
* The card that will be displayed within the RepositoryGrid
* @param {RepositoryData} data The repository data, which contains information about a repository.
*/
function RepositoryCard({data, onClick} : {data:RepositoryData, onClick:(e:MouseEvent, data:RepositoryData) => void}) {
    return (
        <div className="card" onClick={(e) => onClick(e, data)}>
            <img src={data.image} hidden={!data.image}></img>
            <h2>{data.name}</h2>
            <p>{data.description}</p>
        </div>
    );
}

export default RepositoryCard;