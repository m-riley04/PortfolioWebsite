import RepositoryListItem from './RepositoryListItem';
import RepositoryData from '../../classes/RepositoryData';

function RepositoryList( { repos } : { repos:Array<RepositoryData>}) {
    return (
        <ul className="list-group sidebar">
            {repos.map(repo => <RepositoryListItem title={repo.name}/>)}
        </ul>
    );
}

export default RepositoryList;