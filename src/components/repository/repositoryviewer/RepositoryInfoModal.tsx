import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Repository } from '../../../graphql/Query';

function RepositoryInfoModal( { repo, show, onClose } : {repo?:Repository, show?:boolean, onClose?:()=>void}) {
    return (
        <div>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Repository Info</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Owner: {repo?.owner?.login}</p>
                    <p>Date Created: {repo?.createdAt}</p>
                    <p>Date Updated: {repo?.updatedAt}</p>
                    <p>Date Pushed: {repo?.pushedAt}</p>
                    <p>Forks: {repo?.forks?.totalCount}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={onClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default RepositoryInfoModal;