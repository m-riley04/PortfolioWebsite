import { motion } from "framer-motion";


/**
 * A page that displays a grid/list of helpful tools that can be used in-browser
 */
function ToolsPage() {
    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <h1>Tools</h1>
        </motion.div>
    );
}

export default ToolsPage;