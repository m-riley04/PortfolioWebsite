import { useContext } from "react";
import HomePageContext from "../contexts/HomePageContext";
const HomePageSwitcher = ( {title, target} : {title:string, target:string}) => {
    const {page, setPage} = useContext(HomePageContext);
    return (
      <button onClick={() => setPage(target)}>
        {title}
      </button>
    )
}

export default HomePageSwitcher;