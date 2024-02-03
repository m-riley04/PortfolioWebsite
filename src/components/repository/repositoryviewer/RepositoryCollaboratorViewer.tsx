import { useQuery } from "@apollo/client";
import { Collaborator, GET_COLLABORATORS, GITHUB_USERNAME, Repository } from "../../../graphql/Query";
import RepositoryCollaborator from "./RepositoryCollaborator";
import { useEffect, useState } from "react";

/**
 * Displays a list of collaborators from a repository
 * @param {Repository} repo the repository to find collaborators from
 */
function RepositoryCollaboratorViewer( { repo } : { repo?:Repository} ) {
    //=== Hooks
    const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
    
    // Query the collaborators' data from the array of usernames/login
    const { loading, error, data } = useQuery(GET_COLLABORATORS, {
        variables: {
            owner: GITHUB_USERNAME,
            repository: repo?.name
        },
    });

    // Get the current collaborators
    useEffect(() => {
        if (data) {
            // Set the currently displayed collaborators
            setCollaborators(data["repository"]["collaborators"]["nodes"])
        }
    }, [data]);

    // What to show on loading
    if (loading) return (
        <div className="collaborator-viewer">
            <p>Loading collaborators...</p>
        </div>
    );

    // What to show on error
    if (error) return (
        <div className="collaborator-viewer">
            <p>Error: {error.message}</p>
        </div>
    );

    // What to show on success
    return (
        <div className="collaborator-viewer">
            {collaborators.map((collaborator, index) => <RepositoryCollaborator key={index} name={collaborator.name} username={collaborator.login} avatarUrl={collaborator.avatarUrl} url={collaborator.url}></RepositoryCollaborator>)}
        </div>
    );
}

export default RepositoryCollaboratorViewer;