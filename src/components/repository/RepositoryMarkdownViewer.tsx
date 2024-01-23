import { useState, useEffect } from "react";
import Markdown from "react-markdown";

/**
 * @param {string} src A url to a markdown file 
 */
function RepositoryMarkdownViewer( { src } : { src: string } ) {
    
    // Set up states and hooks
    const [text, setText] = useState("");

    /**
     * Fetches the markdown text from src url property
     */
    const fetchSource = () => {
        console.log(`Fetching the markdown source at ${src}...`)
        fetch( src )
            .then ( (response) => {
                if (!response.ok) {
                    setText("### There was an issue fetching the repository's README. \nIt might be because 'README.md' does not exist at the repository's root.")
                    throw new Error("ERROR: There was an error fetching the markdown text.")
                }
                return response.text();
            })
            .then( (text) => {
                setText(text);
            }).catch ( (err) => {
                console.error(err);
            })
    }

    useEffect(() => {
        fetchSource();
    })

    return (
        <div className="markdown-viewer">
            <Markdown>
                {text}
            </Markdown>
        </div>
    );
}

export default RepositoryMarkdownViewer;