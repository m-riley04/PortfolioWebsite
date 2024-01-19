import RepositoryData from "../../classes/RepositoryData";
import {
    Carousel, CarouselItem
} from "react-bootstrap"
import RepositoryMarkdownViewer from "./RepositoryMarkdownViewer"
import { useEffect, useState } from "react";
import RepositoryMediaViewer from "./RepositoryMediaViewer";
import RepositoryCollaboratorViewer from "./RepositoryCollaboratorViewer";
import RepositoryTagViewer from "./RepositoryTagViewer";

function Repository({ data } : { data:RepositoryData }) {
    
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        //setImageUrls(data.getImageUrls("assets"));
    }, []);

    return (
        <div className="container repo">
            <div className="row">
                <div className="col-6">
                    <h1>{data.name}</h1>
                    <p>{data.language}</p>
                </div>
                <div className="col">
                    
                </div>
                <div className="col">

                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <h3>README</h3>
                    <RepositoryMarkdownViewer src={data.getReadmeUrl()}/>
                </div>
                <div className="col-4">
                    <h3>Images</h3>
                    <RepositoryMediaViewer urls={imageUrls}/>
                    {/*<Carousel className="media-viewer"></Carousel>*/}
                    {/*imageUrls.map(url => <img src={url} key="" ></img>)*/}

                    <h3>Collaborators</h3>
                    <RepositoryCollaboratorViewer/>

                    <h3>Tags</h3>
                    <RepositoryTagViewer/>
                </div>
            </div>
        </div>
    );
}

export default Repository;