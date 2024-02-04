import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Repository } from '../../../graphql/Query';

function RepositoryInfoModal( { repo, show, onClose } : {repo?:Repository, show?:boolean, onClose?:()=>void}) {
    return (
        <>
            <Modal show={show} onHide={onClose} className="modal">
                <Modal.Header>
                    <Modal.Title>More Information</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Owner: <a href={`https://github.com/${repo?.owner?.login}`} target="_blank" rel="noreferrer">{repo?.owner?.login}</a></p>
                    <p>Date Created: {repo?.createdAt}</p>
                    <p>Date Updated: {repo?.updatedAt}</p>
                    <p>Date Pushed: {repo?.pushedAt}</p>
                    <p>Forks: {repo?.forks?.totalCount}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={onClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RepositoryInfoModal;