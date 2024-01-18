import { motion } from "framer-motion";

function ToolsPage() {
    return (
        <motion.div 
            className="page-container"
            
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <h1>Tools</h1>
        </motion.div>
    );
}

export default ToolsPage;