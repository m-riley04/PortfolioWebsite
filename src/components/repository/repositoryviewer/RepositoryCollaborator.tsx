function RepositoryCollaborator( { name, username, avatarUrl, url } : { name?:string, username?:string, avatarUrl?:string, url?:string}) {
    return (
        <a href={url} target="_blank" rel="noreferrer">
        <div className="collaborator">
            <img src={avatarUrl}></img>
            <h4>{username}</h4>
            <p>{name}</p>
        </div>
        </a>
    );
}

export default RepositoryCollaborator;