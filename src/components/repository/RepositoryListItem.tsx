/*
An item in a RepositoryList that contains information about a repository

Properties:
    - name: The name of the repository
    - thumbnail: The thumbnail of the repository
*/
function RepositoryListItem({name = "", thumbnail = "",}: {name: string, thumbnail?: string}) {
  return (
    <li className="list-group-item list-item clickable">
        <img className="img-thumbnail" src={thumbnail}></img>
        <h4 className="list-item-title">{name}</h4>
    </li>
  );
}

export default RepositoryListItem;
