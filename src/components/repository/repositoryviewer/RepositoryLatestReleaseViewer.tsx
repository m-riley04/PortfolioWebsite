import { useEffect, useState } from "react";
import { GET_LATEST_RELEASE, GITHUB_USERNAME, Release, Repository } from "../../../graphql/Query";
import { useQuery } from "@apollo/client";
import RepositoryRelease from "./RepositoryRelease";

/**
 * @param {Repository} repo
 * @returns an element that displays the latest release
 */
function RepositoryLatestReleaseViewer( { repo } : { repo?:Repository }) {
    //=== Hooks
    const [release, setRelease] = useState<Release>();
    
    // Query the collaborators' data from the array of usernames/login
    const { loading, error, data } = useQuery(GET_LATEST_RELEASE, {
        variables: {
            user: GITHUB_USERNAME,
            repository: repo?.name
        },
    });

    useEffect(() => {
        if (data) {
            setRelease(data["user"]["repository"]["latestRelease"])
        }
    }, [data]);

    // Check if loading
    if (loading) return (
        <div className="latest-release-viewer">
            <p>Loading releases...</p>
        </div>
    );

    // Check for errors
    if (error) return (
        <div className="latest-release-viewer">
            <p>Error: {error.message}</p>
        </div>
    );

    // Check if query was successful
    if (data) {

        // Check if there are any releases
        if (release) return (
            <div className="latest-release-viewer">
                <RepositoryRelease tag={release.tagName} createdAt={release.createdAt} assets={release.releaseAssets.nodes}></RepositoryRelease>
            </div>
        );

        // Show on no releases
        return (
            <div className="latest-release-viewer">
                <h2>There are no releases for this repository</h2>
            </div>
        );
    }
}

export default RepositoryLatestReleaseViewer;