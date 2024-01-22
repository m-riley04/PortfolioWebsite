import RepositoryData from "../../classes/RepositoryData";
import RepositoryMarkdownViewer from "./RepositoryMarkdownViewer"
import { useEffect, useState } from "react";
import RepositoryMediaViewer from "./RepositoryMediaViewer";
import RepositoryCollaboratorViewer from "./RepositoryCollaboratorViewer";
import RepositoryTagViewer from "./RepositoryTagViewer";
import { Outlet } from "react-router";

function Repository( { repo } : { repo:RepositoryData }) {
    const [repository, setRepository] = useState(new RepositoryData());
    const [imageUrls, setImageUrls] = useState([]);
    const [images, setImages] = useState([Element]);

    useEffect(() => {
        if (repo != null && repo != undefined) {
            setRepository(repo);
            setImageUrls(repository.getImageUrls("assets"));
            setImages(imageUrls.map((url, index) => <img src={url} alt="image" key={index}></img>));
        } else {
            console.warn("'Repo' is null.")
        }
        
    }, []);

    return (
        <>
            <div className="container repo">
                <div className="row">
                    <div className="col-6">
                        <h1>{repository.name}</h1>
                        <p>{repository.language}</p>
                    </div>
                    <div className="col">
                        
                    </div>
                    <div className="col">

                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <h3>README</h3>
                        <RepositoryMarkdownViewer src={repository.getReadmeUrl()}/>
                    </div>
                    <div className="col-4">
                        <h3>Images</h3>
                        {/*images*/}
                        <RepositoryMediaViewer urls={imageUrls}/>

                        <h3>Collaborators</h3>
                        <RepositoryCollaboratorViewer/>

                        <h3>Tags</h3>
                        <RepositoryTagViewer/>
                    </div>
                </div>
            </div>
            <Outlet/>
        </>
    );
}

export default Repository;