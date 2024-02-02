function RepositoryCollaborator( { name, username, avatarUrl, url } : { name?:string, username?:string, avatarUrl?:string, url?:string}) {
    return (
        <a href={url} target="_blank" rel="noreferrer">
        <div className="collaborator">
            <img src={avatarUrl}></img>
            <h3>{name}</h3>
            <p>{username}</p>
        </div>
        </a>
    );
}

export default RepositoryCollaborator;