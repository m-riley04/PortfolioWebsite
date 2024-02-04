import { useState } from "react";
import { ReleaseAsset } from "../../../graphql/Query";
import ReleaseAssetsModal from "./ReleaseAssetsModal";

function RepositoryRelease( { tag, createdAt, assets } : { tag?:string, createdAt?:string, assets?:ReleaseAsset[] }) {
    const [show, setShow] = useState(false);
    
    const handleDownload = () => {
        // Check if there's more than one asset in the release
        if (assets) {
            if (assets.length <= 0) {
                console.log("No assets found for the release.");  
            } else if (assets.length > 1) {
                setShow(true);
            } else {
                // Download the first file
                window.open(assets[0].downloadUrl, "_blank")?.focus();
            }
        }
    }
    
    return (
        <>
            <ReleaseAssetsModal assets={assets} show={show} onClose={() => setShow(false)}></ReleaseAssetsModal>
            <div className="clickable release">
                <h4>{tag}</h4>
                <p>{createdAt}</p>

                <button onClick={handleDownload}>Download</button>
            </div>
        </>
    );
}

export default RepositoryRelease;