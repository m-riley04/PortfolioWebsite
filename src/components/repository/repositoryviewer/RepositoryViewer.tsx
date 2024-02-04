import RepositoryMarkdownViewer from "./RepositoryMarkdownViewer.tsx"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import RepositoryMediaViewer from "./RepositoryMediaViewer.tsx";
import RepositoryTagViewer from "./RepositoryTagViewer.tsx";
import RepositoriesPageSwitcher from "../../switchers/RepositoriesPageSwitcher.tsx";
import { Repository } from "../../../graphql/Query.ts";
import RepositoryInfoModal from "./RepositoryInfoModal.tsx";
import RepositoryCollaboratorViewer from "./RepositoryCollaboratorViewer.tsx";
import RepositoryLatestReleaseViewer from "./RepositoryLatestReleaseViewer.tsx";

/**
 * A subpage of RepositoryPage that displays the contents of the selected repository
 * @param {Repository} repo a repository struct/interface that contains information about a repository 
 * @param {React.RefObject<HTMLDivElement>} parent the parent object that the component is a child of
 * @returns the notable contents of a repository in a custom design/format
 */
function RepositoryViewer({ repo, parent } : { repo?:Repository, parent?:React.RefObject<HTMLDivElement>}) {
    const navigate = useNavigate();
    const [showInfo, setShowInfo] = useState(false);

    // Override the back button to navigate to the repository grid
    useEffect(() => {
        // Scroll to the top
        if (parent != null && parent != undefined && parent?.current != null) {
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
            <RepositoryInfoModal repo={repo} show={showInfo} onClose={() => setShowInfo(!showInfo)} />
            
            <div className="row">
                <RepositoriesPageSwitcher title="Back" target="grid" />
                <div className="col-10" style={{display: "flex"}}>
                    <h1>{repo?.name}</h1>
                    <button className="button-info" onClick={() => { setShowInfo(!showInfo) } }>i</button>
                </div>
            </div>
            <div className="row">
                <p>{repo?.primaryLanguage?.name}</p>
            </div>
            <div className="row" style={{height: "60vh"}}>
                <div className="col-7">
                    <h3>README</h3>
                    <RepositoryMarkdownViewer repo={repo}/>
                </div>
                <div className="col-5">
                    <h3>Images</h3>
                    <RepositoryMediaViewer repo={repo}/>
                    <br></br>
                    <h3>Collaborators</h3>
                    <RepositoryCollaboratorViewer repo={repo}/>
                    <br></br>
                    <h3>Releases</h3>
                    <RepositoryLatestReleaseViewer repo={repo}></RepositoryLatestReleaseViewer>
                </div>
            </div>
        </div>
    );
}

export default RepositoryViewer;