import Markdown from "react-markdown";
import { GET_README, Repository } from "../../graphql/Query";
import { useQuery } from "@apollo/client";

/**
 * @param {string} src A url to a markdown file 
 */
function RepositoryMarkdownViewer( { repo } : { repo?:Repository } ) {
    // Query the README
    const { loading, error, data } = useQuery(GET_README, {
        variables: {
            repository: repo?.name,
            owner: repo?.owner.login,
            filepath: "MAIN:README.md"
        },
    });

    if (loading) return (
        <div className="markdown-viewer">
            <p>Loading README.md...</p>
        </div>
    );

    if (error) return (
        <div className="markdown-viewer">
            <p>ERROR: Could not load README.md</p>
            <p>Reason: {error.message}</p>
        </div>
    );

    if (data) { 
        try {
            return (
                <div className="markdown-viewer">
                    <Markdown>
                        {data["repository"]["object"]["text"]}
                    </Markdown>
                </div>
            );
        } catch (e) {
            return (
                <div className="markdown-viewer">
                    <p>ERROR: Could not load README.md</p>
                </div>  
            );
        }
    }
}

export default RepositoryMarkdownViewer;