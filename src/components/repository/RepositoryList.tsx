import RepositoryListItem from './RepositoryListItem';
import RepositoryData from '../../classes/RepositoryData';

function RepositoryList( { repos } : { repos:Array<RepositoryData>}) {
    return (
        <ul className="list-group list">
            {repos.map((repo, index) => <RepositoryListItem key={index} name={repo.name}/>)}
        </ul>
    );
}

export default RepositoryList;