import { Carousel } from "react-bootstrap";

function RepositoryMediaViewer( { urls } : { urls?:Array<string>}) {

    return (
        <Carousel className="media-viewer">
            {urls?.map((url, index) => <Carousel.Item key={index} className="media-viewer-item"><img src={url} alt={url}></img></Carousel.Item>)}
        </Carousel>
    );
}

export default RepositoryMediaViewer;