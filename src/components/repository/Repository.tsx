import RepositoryData from "../../classes/RepositoryData";
import RepositoryMarkdownViewer from "./RepositoryMarkdownViewer"
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import RepositoryMediaViewer from "./RepositoryMediaViewer";
import RepositoryCollaboratorViewer from "./RepositoryCollaboratorViewer";
import RepositoryTagViewer from "./RepositoryTagViewer";

function Repository({ data } : { data:RepositoryData }) {
    
    const [imageUrls, setImageUrls] = useState([]);

    const navigate = useNavigate();

    // Get the repositories images from a folder
    useEffect(() => {
        window.scrollTo(0, 0);

        // Try a folder named "assets"
        data.getImageUrls("assets")
            .then(urls => setImageUrls(urls))  
            .catch(err => console.error(err));
    }, [data]);

    // Override the back button to navigate to the repository grid
    useEffect(() => {
        // Function to be called when back button is pressed
        const handleBackButton = (event) => {
            console.log("Back button pressed");
            navigate("../repositories");  
        };

        // Add event listener for 'popstate' event
        window.addEventListener('popstate', handleBackButton);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, []);

    return (
        <div className="repo">
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