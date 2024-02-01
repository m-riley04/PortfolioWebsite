import RepositoryMarkdownViewer from "./RepositoryMarkdownViewer.tsx"
import { useEffect } from "react";
import { useNavigate } from "react-router";
import RepositoryMediaViewer from "./RepositoryMediaViewer.tsx";
import RepositoryTagViewer from "./RepositoryTagViewer.tsx";
import RepositoriesPageSwitcher from "../../switchers/RepositoriesPageSwitcher.tsx";
import { Repository } from "../../../graphql/Query.ts";


/**
 * A subpage of RepositoryPage that displays the contents of the selected repository
 * @param {Repository} repo a repository struct/interface that contains information about a repository 
 * @param {React.RefObject<HTMLDivElement>} parent the parent object that the component is a child of
 * @returns the notable contents of a repository in a custom design/format
 */
function RepositoryViewer({ repo, parent } : { repo?:Repository, parent?:React.RefObject<HTMLDivElement>}) {
    const navigate = useNavigate();

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
            <div className="row">
                <div className="col-10">
                    <h1>{repo?.name}</h1>
                    <p>{repo?.primaryLanguage?.name}</p>
                </div>
                <div className="col">
                    <RepositoriesPageSwitcher title="<-- Grid" target="grid" />
                </div>
            </div>
            <div className="row">
                <div className="col-7">
                    <h3>README</h3>
                    <RepositoryMarkdownViewer repo={repo}/>
                </div>
                <div className="col-5">
                    <h3>Images</h3>
                    <RepositoryMediaViewer repo={repo}/>

                    <h3>Topics</h3>
                    <RepositoryTagViewer/>
                </div>
            </div>
        </div>
    );
}

export default RepositoryViewer;