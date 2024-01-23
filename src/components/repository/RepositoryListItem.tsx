import RepositoryData from "../../classes/RepositoryData";
import { useContext } from "react"
import CurrentRepositoryContext from "../contexts/CurrentRepositoryContext";
import RepositoriesPageContext from "../contexts/RepositoriesPageContext";


/*
An item in a RepositoryList that contains information about a repository

Properties:
    - repo: a repository data object
*/
function RepositoryListItem({repo}: {repo:RepositoryData}) {

  // Get contexts of parent page and the currently selected repository
  const { setCurrentRepository } = useContext(CurrentRepositoryContext);
  const { setPage } = useContext(RepositoriesPageContext);
  
  return (
    <li className="list-group-item list-item clickable" onClick={() => {
      setCurrentRepository(repo);
      setPage("repository");
    }}>
        <img className="img-thumbnail" src={repo.image}></img>
        <h4 className="list-item-title">{repo.name}</h4>
    </li>
  );
}

export default RepositoryListItem;
