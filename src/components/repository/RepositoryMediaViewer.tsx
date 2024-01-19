function RepositoryMediaViewer( { urls } : { urls?:Array<string>}) {


    return (
        <div className="media-viewer">
            {urls?.map((url, index) => <img src={url} alt={url} key={index}></img>)}
        </div>
    );
}

export default RepositoryMediaViewer;