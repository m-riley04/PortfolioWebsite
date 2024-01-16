import NavigationBar from "./components/NavigationBar";
import RepositoryPage from './components/RepositoryPage'
//import {useState} from 'react';

function App() {
  //#region STATES
  // Pages

  /**
   * The current page that the website is on.
   * @type {number} An integer representing the current page/component:
   * - 0: Home
   * - 1: Repositories
   * - 2: Projects
   */
  //const [page, setPage] = useState(0);
  //#endregion

  return (
    <div className="bg-primary">
      <NavigationBar />
      <div className="main-container">
        <RepositoryPage/>
      </div>
    </div>
  );
}

export default App
