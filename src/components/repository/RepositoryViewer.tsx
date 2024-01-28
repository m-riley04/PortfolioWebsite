import RepositoryMarkdownViewer from "./RepositoryMarkdownViewer"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import RepositoryMediaViewer from "./RepositoryMediaViewer";
import RepositoryTagViewer from "./RepositoryTagViewer";
import RepositoriesPageSwitcher from "../switchers/RepositoriesPageSwitcher";
import { Repository } from "../../graphql/Query.ts";

function RepositoryViewer({ data, parent } : { data:Repository, parent?:React.RefObject<HTMLDivElement>}) {
    const [imageUrls, setImageUrls] = useState([""]);

    const navigate = useNavigate();

    // Override the back button to navigate to the repository grid
    useEffect(() => {
        // Scroll to the top
        if (parent != null && parent != undefined) {
            parent?.current.scrollTo(0, 0);
        }

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
                    <p>{data.primaryLanguage.name}</p>
                </div>
                <div className="col">
                    <RepositoriesPageSwitcher title="<-- Grid" target="grid" />
                </div>
            </div>
            <div className="row">
                <div className="col-7">
                    <h3>README</h3>
                    <RepositoryMarkdownViewer src={""}/>
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

export default RepositoryViewer;