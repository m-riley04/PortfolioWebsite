import RepositoryListItem from './RepositoryListItem';
import { Repository } from "../../graphql/Query.ts";

/**
 * @param {Array<Repository> | undefined} repos an array of repositories 
 * @returns a vertical list of RepositoryListItems
 */
function RepositoryList( { repos } : { repos?:Array<Repository> | undefined } ){
    return (
        <ul className="list-group list">
            {repos?.map((repo, index) => <RepositoryListItem key={index} repo={repo}/>)}
        </ul>
    );
}

export default RepositoryList;