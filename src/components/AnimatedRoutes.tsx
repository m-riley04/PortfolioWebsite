
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
import { useState } from "react";
import RepositoryData from "../classes/RepositoryData";
import CurrentRepositoryContext from "./contexts/CurrentRepositoryContext";
import RepositoriesContext from "./contexts/RepositoriesContext";

function AnimatedRoutes() {
    const location = useLocation();
    const [repositories, setRepositories] = useState([new RepositoryData()]);
    const repositoriesValue = { repositories, setRepositories }
    const [currentRepository, setCurrentRepository] = useState(new RepositoryData());
    const currentRepositoryValue = {currentRepository, setCurrentRepository};

    return (
        <RepositoriesContext.Provider value={repositoriesValue}>
        <CurrentRepositoryContext.Provider value={currentRepositoryValue}>
        <AnimatePresence mode="wait"> 
            <Routes location={location} key={location.pathname}>
                <Route element={<WithoutNavbar/>}>
                    <Route index path="/" element={<HomePage/>}/>
                </Route>
                <Route element={<WithNavbar/>}>
                    <Route path="repositories" element={<RepositoryPage/>}>
                        <Route index element={<Navigate to="grid" replace />}/>
                        <Route path="grid" element={<RepositoryGrid repos={repositories}/>}/>
                        <Route path="repository" element={<Repository repo={currentRepository}/>}/>
                    </Route>
                    <Route path="projects" element={<ComingSoonPage/>}/>
                    <Route path="tools" element={<ToolsPage/>}/>
                    <Route path="research" element={<ComingSoonPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </AnimatePresence>
        </CurrentRepositoryContext.Provider>
        </RepositoriesContext.Provider>
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