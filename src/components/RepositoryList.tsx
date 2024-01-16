import RepositoryListItem from './RepositoryListItem';
import Repository from '../classes/Repository';

function RepositoryList( { repos } : { repos:Array<Repository>}) {
    return (
        <ul className="list-group sidebar">
            {repos.map(repo => <RepositoryListItem title={repo.name}/>)}
        </ul>
    );
}

export default RepositoryList;