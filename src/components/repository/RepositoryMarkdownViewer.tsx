import { useState } from "react";

/**
 * @param {string} src A url to a markdown file 
 */
function RepositoryMarkdownViewer( { src, repositoryRefreshed } : { src: string, repositoryRefreshed?:boolean } ) {
    
    const [text, setText] = useState("");

    /**
     * Fetches the markdown text from the given src url
     */
    const fetchSource = () => {
        fetch( src )
            .then ( (response) => {
                return response.text();
            })
            .then( (text) => {
                setText(text);
            }).catch ( (err) => {
                console.log(`There was an error fetching the markdown text: ${err}`)
            })
    }

    // Check if the repository has changed
    if (repositoryRefreshed) {
        // Fetch the src
        fetchSource()

        // Reset the repositoryChanged flag
        repositoryRefreshed = true;
    }
    return (
        <div style={{overflow: "scroll"}}>
            
        </div>
    );
}

export default RepositoryMarkdownViewer;