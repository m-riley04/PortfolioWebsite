import HomePage from "./components/pages/HomePage";
import NavigationBar from "./components/navigation/NavigationBar";
import RepositoryPage from './components/pages/RepositoryPage'
import {useState} from 'react';
import AppPageContext from './components/contexts/AppPageContext.ts';

//=== CONSTANTS
const PAGE_DEFAULT = "#repositories"

function App() {
  //#region STATES
  // Pages
  /**
     * The map of availaible pages 
     * @type {string : JSX.Element} A map of the main pages 
     * - #home
     * - #repositories
     * - #projects
     * - #tools
     * - #fun
     */
  const pages : {[name : string] : JSX.Element} = {
    "#home": <HomePage/>,
    "#repositories": <RepositoryPage/>,
    "#projects": <></>,
    "#tools": <></>,
    "#fun": <></>
  };

  const [page, setPage] = useState(PAGE_DEFAULT);
  const pageValue = {page, setPage}
  //#endregion

  return (
    <AppPageContext.Provider value={pageValue}>
      <div className="bg-primary">
        <NavigationBar />
        <div className="main-container">
          {pages[page]}
        </div>
      </div>
    </AppPageContext.Provider>
  );
}

export default App
