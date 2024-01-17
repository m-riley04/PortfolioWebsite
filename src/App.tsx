import HomePage from "./components/pages/HomePage";
import NavigationBar from "./components/NavigationBar";
import RepositoryPage from './components/pages/RepositoryPage'
import {useState} from 'react';

function App() {
  //#region STATES
  // Pages
  const [page, setPage] = useState("#repositories");

  /**
   * The map of availaible pages 
   * @type {string : JSX.Element} A map of 
   * - #home
   * - #repositories
   * - #projects
   */
  const pages : {[name : string] : JSX.Element} = {
    "#home": <HomePage/>,
    "#repositories": <RepositoryPage/>,
    "#projects": <></>,
    "#tools": <></>,
    "#fun": <></>
  };

  const handleNavigation = (e:MouseEvent, pageName:string) => { 
    // Set the current page name
    setPage(pageName);
  }
  //#endregion

  return (
    <div className="bg-primary">
      <NavigationBar />
      <div className="main-container">
        {pages[page]}
      </div>
    </div>
  );
}

export default App
