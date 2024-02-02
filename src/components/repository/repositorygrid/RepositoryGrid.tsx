import RepositoryGridCard from './RepositoryGridCard.tsx'
import { Repository } from "../../../graphql/Query.ts";
import { motion } from "framer-motion";
import { Row, Col } from "react-bootstrap";


/**
 * @param {Array<Repository>} repos an array of repositories
 * @returns a grid of repository cards
 */
function RepositoryGrid( {repos} : {repos?:Array<Repository> | undefined} ) {
    return (
        <>
            <h1>Repositories</h1>
            <motion.div 
                className="grid"

                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <Row>
                    {repos?.map((repo, index) => <Col key={index} xs={8} sm={6} md={5} lg={4} xl={3} xxl={3} style={{margin: "auto"}}><RepositoryGridCard repo={repo} animations={{delay: index/25, duration: .8}}></RepositoryGridCard></Col>)}
                </Row>
            </motion.div>
        </>
    );
}

export default RepositoryGrid;