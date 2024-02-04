import {motion} from "framer-motion";
import NavigationGroup from "../components/NavigationGroup";
import bannerSrc from "../../assets/home_banner.jpg";

/**
 * The home/root page of the website
 */
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
            
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <div id="banner" style={{background: `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bannerSrc})`}}>
                <h1>Welcome to my page!</h1>
                <NavigationGroup buttons={paths}></NavigationGroup>
            </div>
        </motion.div>
    );
}

export default HomePage;