
import HomePage from "./pages/HomePage";
import RepositoryPage from "./pages/RepositoryPage";
import ToolsPage from "./pages/ToolsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { 
    Route, 
    Routes, 
    useLocation
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route index element={<HomePage/>}/>
                <Route path="repositories" element={<RepositoryPage/>}/>
                <Route path="tools" element={<ToolsPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;