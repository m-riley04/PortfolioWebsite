import { useState } from "react";
import { ReleaseAsset } from "../../../graphql/Query";
import ReleaseAssetsModal from "./ReleaseAssetsModal";
import { Col, Row } from "react-bootstrap";

function RepositoryRelease( { tag, createdAt, size, assets } : { tag?:string, createdAt?:string, size?:number, assets?:ReleaseAsset[] }) {
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
                <Row>
                    <Col md={3}>
                        <p>Version</p>
                    </Col>
                    <Col md={3}>
                        <p>Date Released</p>
                    </Col>
                    <Col md={3}>
                        <p>Size</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <h4>{tag}</h4>
                    </Col>
                    <Col md={3}>
                        <p>{createdAt}</p>
                    </Col>
                    <Col md={3}>
                        <p>{size}</p>
                    </Col>
                    <Col>
                        <button onClick={handleDownload}>Download</button>
                    </Col>
                </Row>
                
                

                
            </div>
        </>
    );
}

export default RepositoryRelease;