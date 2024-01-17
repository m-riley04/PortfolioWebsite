import { useContext } from "react";
import AppPageContext from "../contexts/AppPageContext.ts";

const AppPageSwitcher = ( {title, target} : {title:string, target:string}) => {
    const {page, setPage} = useContext(AppPageContext);
    return (
      <button onClick={() => setPage(target)}>
        {title}
      </button>
    )
}

export default AppPageSwitcher;