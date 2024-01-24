import RepositoryGridCard from './RepositoryGridCard'
import RepositoryData from '../../classes/RepositoryData';
import { motion } from "framer-motion";

function RepositoryGrid( {repos} : {repos:Array<RepositoryData>} ) {
    return (
        <>
            <h1>Repositories</h1>
            <motion.div 
                className="grid"

                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                {repos.map((repo, index) => <RepositoryGridCard data={repo} animations={{delay: index/25, duration: .8}} key={index}></RepositoryGridCard>)}
            </motion.div>
        </>
    );
}

export default RepositoryGrid;