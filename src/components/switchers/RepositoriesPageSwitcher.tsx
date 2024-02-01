import { useContext } from "react";
import RepositoriesPageContext from "../contexts/RepositoriesPageContext.ts";

/**
 * A button component that changes the subpage of the RepositoryPage
 * @param {string} title the title that is displayed on the button
 * @param {string} target the name of the target subpage to be displayed 
 */
const RepositoriesPageSwitcher = ( {title, target} : {title:string, target:string}) => {
    const { setPage } = useContext(RepositoriesPageContext);
    return (
      <button onClick={() => setPage(target)}>
        {title}
      </button>
    )
}

export default RepositoriesPageSwitcher;