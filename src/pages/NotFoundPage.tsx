import { motion } from "framer-motion";

function NotFoundPage() {

    return (
        <motion.div 
            className="page-container"
            
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <h1>404: The page does not exist.</h1>
            <p> If this issue persists, please reach out via the <a href="https://github.com/m-riley04/PortfolioWebsite" rel="noreferrer" target="_blank">GitHub repository</a>.</p>
        </motion.div>
    );
}

export default NotFoundPage;