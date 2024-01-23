import { useState, useEffect } from "react";
import Markdown from "react-markdown";


/**
 * Fetches the markdown text from src url property
 */
const fetchSource = (src:string) => {
    console.log(`Fetching the markdown source at ${src}...`)
    return fetch( src )
        .then ( (response) => {
            if (!response.ok) {
                throw new Error("ERROR: There was an error fetching the markdown text.")
            }
            return response.text();
        })
}


/**
 * @param {string} src A url to a markdown file 
 */
function RepositoryMarkdownViewer( { src } : { src: string } ) {
    
    // Set up states and hooks
    const [text, setText] = useState("");

    useEffect(() => {
        fetchSource(src)
            .then( (text) => {
                setText(text);
            })
            .catch( (err) => {
                setText("### There was an issue fetching the repository's README. \nIt might be because 'README.md' does not exist at the repository's root.")
                console.error(err);
            })
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