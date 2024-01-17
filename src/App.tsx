import HomePage from "./components/pages/HomePage";
import NavigationBar from "./components/navigation/NavigationBar";
import RepositoryPage from './components/pages/RepositoryPage'
import {useContext, useState} from 'react';
import AppPageContext from './components/contexts/AppPageContext';
import AppPageSwitcher from './components/switchers/AppPageSwitcher';

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

  const pageDefault = "#repositories";
  const [page, setPage] = useState(pageDefault);
  const pageValue = {page, setPage}

  const handleNavigation = (e:MouseEvent, pageName:string) => { 
    // Set the current page name
    setPage(pageName);
  }
  //#endregion

  return (
    <AppPageContext.Provider value={pageValue}>
      <div className="bg-primary">
        <NavigationBar />
        <div className="main-container">
          <AppPageSwitcher title="Home" target="#home"></AppPageSwitcher>
          <AppPageSwitcher title="Repositories" target="#repositories"></AppPageSwitcher>
          {pages[page]}
        </div>
      </div>
    </AppPageContext.Provider>
  );
}

export default App
