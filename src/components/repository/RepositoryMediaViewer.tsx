import { Carousel } from "react-bootstrap";

function RepositoryMediaViewer( { urls } : { urls?:Array<string>}) {

    return (
        <div className="media-viewer">
            <Carousel>
                {urls?.map((url, index) => <Carousel.Item key={index}><img src={url} alt={url}></img></Carousel.Item>)}
            </Carousel>
        </div>
    );
}

export default RepositoryMediaViewer;