import RepositoryData from "../../classes/RepositoryData";
import RepositoryMarkdownViewer from "./RepositoryMarkdownViewer"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import RepositoryMediaViewer from "./RepositoryMediaViewer";
import RepositoryCollaboratorViewer from "./RepositoryCollaboratorViewer";
import RepositoryTagViewer from "./RepositoryTagViewer";
import RepositoriesPageSwitcher from "../switchers/RepositoriesPageSwitcher";

function Repository({ data, parent } : { data:RepositoryData, parent?:React.RefObject<HTMLDivElement>}) {
    
    const [imageUrls, setImageUrls] = useState([new String]);

    const navigate = useNavigate();

    // Get the repositories images from a folder
    useEffect(() => {
        if (parent != null && parent != undefined) {
            parent?.current.scrollTo(0, 0);
        }

        // Try a folder named "assets"
        data.getImageUrls("assets")
            .then(urls => setImageUrls(urls))  
            .catch(err => console.error(err));
    }, [data]);

    // Override the back button to navigate to the repository grid
    useEffect(() => {
        // Function to be called when back button is pressed
        const handleBackButton = () => {
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
                <div className="col-10">
                    <h1>{data.name}</h1>
                    <p>{data.language}</p>
                </div>
                <div className="col">
                    <RepositoriesPageSwitcher title="<-- Grid" target="grid" />
                </div>
            </div>
            <div className="row">
                <div className="col-7">
                    <h3>README</h3>
                    <RepositoryMarkdownViewer src={data.getReadmeUrl()}/>
                </div>
                <div className="col-5">
                    <h3>Images</h3>
                    <RepositoryMediaViewer urls={imageUrls}/>

                    <h3>Topics</h3>
                    <RepositoryTagViewer/>
                </div>
            </div>
        </div>
    );
}

export default Repository;