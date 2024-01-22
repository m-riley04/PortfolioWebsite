
import HomePage from "./pages/HomePage";
import RepositoryPage from "./pages/RepositoryPage";
import ToolsPage from "./pages/ToolsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { 
    Outlet,
    Route, 
    Routes, 
    useLocation,
    Navigate
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NavigationBar from "./NavigationBar";
import ComingSoonPage from "./pages/ComingSoonPage";
import RepositoryGrid from "./repository/RepositoryGrid";
import Repository from "./repository/Repository";

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait"> 
            <Routes location={location} key={location.pathname}>
                <Route element={<WithoutNavbar/>}>
                    <Route index path="/" element={<HomePage/>}/>
                </Route>
                <Route element={<WithNavbar/>}>
                    <Route path="repositories" element={<RepositoryPage/>}>
                        <Route index element={<Navigate to="grid" replace />}/>
                        <Route path="grid" element={<RepositoryGrid state={location.state}/>}/>
                        <Route path="repository" element={<Repository/>}/>
                    </Route>
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