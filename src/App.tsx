import NavigationBar from "./components/navigation/NavigationBar";

import HomePage from "./components/pages/HomePage";
import ToolsPage from "./components/pages/ToolsPage.tsx";
import RepositoryPage from './components/pages/RepositoryPage'
import NotFoundPage from './components/pages/NotFoundPage'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/repositories" element={<RepositoryPage/>}></Route>
        <Route path="/tools" element={<ToolsPage/>}></Route>
        <Route path="*" element={<NotFoundPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App
