import { Collaborator } from "../../../graphql/Query";

/**
 * Displays a list of collaborators
 * @param {Array<Collaborator>} collaborators a list of collaborators' logins/usernames
 */
function RepositoryCollaboratorViewer( { collaborators } : { collaborators:Array<Collaborator>} ) {
    // Query the collaborators' data from the array of usernames/login

    return (
        <div className="collaborator-viewer">
            
        </div>
    );
}

export default RepositoryCollaboratorViewer;