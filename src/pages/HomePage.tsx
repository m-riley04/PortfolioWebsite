import {motion} from "framer-motion";
import NavigationGroup from "../components/NavigationGroup";

function HomePage() {
    const paths = [
        {title: "Projects", path: "repositories"},
        {title: "About", path: "about"},
        {title: "Tools", path: "tools"},
        {title: "Research", path: "research"},
    ]
;    return (
        <motion.div 
            id="home"
            className="page-container"
            
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <div id="banner">
                <h1>Welcome to my page!</h1>
                <NavigationGroup buttons={paths}></NavigationGroup>
            </div>
        </motion.div>
    );
}

export default HomePage;