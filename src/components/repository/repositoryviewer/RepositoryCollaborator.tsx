function RepositoryCollaborator( { name, username, avatarUrl, url } : { name?:string, username?:string, avatarUrl?:string, url?:string}) {
    const handleClick = () => {
        window.open(url, "_blank")?.focus();
    }
    
    return (
        <div className="clickable collaborator" onClick={handleClick}>
            <img src={avatarUrl}></img>
            <h4>{username}</h4>
            <p>{name}</p>
        </div>
    );
}

export default RepositoryCollaborator;