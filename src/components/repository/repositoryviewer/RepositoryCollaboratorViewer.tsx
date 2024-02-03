import { Collaborator } from "../../../graphql/Query";

/**
 * Displays a list of collaborators from a repository
 * @param {Repository} repo the repository to find collaborators from
 */
function RepositoryCollaboratorViewer( { repo } : { repo?:Repository} ) {
    // Query the collaborators' data from the array of usernames/login

    return (
        <div className="collaborator-viewer">
            
        </div>
    );
}

export default RepositoryCollaboratorViewer;