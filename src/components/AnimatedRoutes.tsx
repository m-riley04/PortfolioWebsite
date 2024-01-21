
import HomePage from "./pages/HomePage";
import RepositoryPage from "./pages/RepositoryPage";
import ToolsPage from "./pages/ToolsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { 
    Outlet,
    Route, 
    Routes, 
    useLocation
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NavigationBar from "./NavigationBar";
import ComingSoonPage from "./pages/ComingSoonPage";

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route element={<WithoutNavbar/>}>
                    <Route index element={<HomePage/>}/>
                </Route>
                <Route element={<WithNavbar/>}>
                    <Route path="repositories" element={<RepositoryPage/>}/>
                    <Route path="projects" element={<ComingSoonPage/>}/>
                    <Route path="tools" element={<ToolsPage/>}/>
                    <Route path="research" element={<ComingSoonPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </AnimatePresence>
    );
}

const WithNavbar = () => {
    return (
    <>
        <NavigationBar/>
        <Outlet/>
    </>
    );
}

const WithoutNavbar = () => {
    return (
        <Outlet/>
    );
}

export default AnimatedRoutes;