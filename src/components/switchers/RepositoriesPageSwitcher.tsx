import { useContext } from "react";
import RepositoriesPageContext from "../contexts/RepositoriesPageContext";
const RepositoriesPageSwitcher = ( {title, target} : {title:string, target:string}) => {
    const {page, setPage} = useContext(RepositoriesPageContext);
    return (
      <button onClick={() => setPage(target)}>
        {title}
      </button>
    )
}

export default RepositoriesPageSwitcher;