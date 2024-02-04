import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ReleaseAsset } from '../../../graphql/Query';

function ReleaseAssetsModal( { assets, show, onClose } : {assets?:ReleaseAsset[], show?:boolean, onClose?:()=>void}) {
    return (
        <>
            <Modal show={show} onHide={onClose} className="modal">
                <Modal.Header>
                    <Modal.Title>Release Assets</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h2>Click the asset you&rsquo;d like to download</h2>
                    <ol>
                        {assets?.map((asset, index) => <li key={index}><a href={asset.downloadUrl} target="_blank" rel="noreferrer">{asset.name}</a></li>)}
                    </ol>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={onClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ReleaseAssetsModal;