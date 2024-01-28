import { Carousel } from "react-bootstrap";
import { Repository } from "../../graphql/Query";
import { useEffect, useState } from "react";


/**
 * Parses the contents of a JSON object to an array
 * @param {object} json A JSON object 
 * @returns {Array<object>} An array of objects
 */
function parseJsonToArray(json:object) {
    const contents:Array<object> = [];
    for (var i in json) {
        // Convert each JSON to a project object
        const item = json[i as keyof object];
        contents.push(item);
    }
    
    return contents;
}

/**
 * Use the GitHub REST API to fetch a list of raw image urls from a path in a repository
 * @param {Repository} repo The repository to search for images from
 * @param {string} path The path of the folder that you would like to search in the repository. ex: "assets", "assets/images"
 * @return {Promise<string[]>} A promise that resolves to an array of image urls
 */
function fetchRepositoryImageUrls(repo:Repository, path:string): Promise<string[]> {
    const folderUrl = "https://api.github.com/repos/" + repo.owner.login + "/" + repo.name + "/contents/" + path;

    return fetch( folderUrl )
        .then((response) => {
            if (!response.ok) {
                throw new Error("ERROR: Could not fetch the image urls (response was not ok)")
            }
            return response.json();
        })
        .then((data) => {
            const contents = parseJsonToArray(data);
            return contents
                .filter((file: any) => file["download_url"].match(/\.(jpg|jpeg|png|gif)$/i))
                .map((file: any) => file["download_url"]);
        })
        .catch((err) => {
            console.error(err);
            return [];
        });
}

function RepositoryMediaViewer( { repo } : { repo?:Repository}) {
    const [urls, setUrls] = useState<Array<string>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    
    useEffect(() => {
        if (repo) {
            // Fetch the image urls from a root "assets" folder
            fetchRepositoryImageUrls(repo, "assets")
                .then(urls => {
                    setUrls(urls);
                    setLoading(false);
                    console.log(urls);
                })  
                .catch(err => {
                    console.error(err);
                    setError(err);
                });
        }
    }, []);

    // Check for an error
    if (error != "") return (
        <div className="media-viewer">
            <p>Error: the images could not be loading.</p>
            <p>Reason: {error}</p>
        </div>
    );

    // Check if the images are still loading
    if (loading) return (
        <div className="media-viewer">
            <p>Loading...</p>
        </div>
    );

    // Otherwise, render the images
    return (
        <Carousel className="media-viewer">
            {urls?.map((url, index) => <Carousel.Item key={index} className="media-viewer-item"><img src={url} alt={url}></img></Carousel.Item>)}
        </Carousel>
    );
}

export default RepositoryMediaViewer;