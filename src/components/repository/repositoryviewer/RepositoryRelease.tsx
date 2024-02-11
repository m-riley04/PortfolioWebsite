import { useEffect, useState } from "react";
import { ReleaseAsset } from "../../../graphql/Query";
import ReleaseAssetsModal from "./ReleaseAssetsModal";
import { Col, Row } from "react-bootstrap";

function RepositoryRelease( { tag, createdAt, assets } : { tag?:string, createdAt?:string, assets?:ReleaseAsset[] }) {
    const [show, setShow] = useState(false);
    const [downloadSize, setDownloadSize] = useState(0);
    
    useEffect(() => {
        if (assets) {
            setDownloadSize(assets[0].size);
        }
    }, [assets]);

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
                        <p>{new Date(createdAt).getDate()}/{new Date(createdAt).getMonth()}/{new Date(createdAt).getFullYear()}</p>
                    </Col>
                    <Col md={3}>
                        <p>{Math.round(downloadSize * 10e-7)/100} gb</p>
                    </Col>
                    <Col md={3}>
                        <button onClick={handleDownload}>Download</button>
                    </Col>
                </Row>
                
                

                
            </div>
        </>
    );
}

export default RepositoryRelease;