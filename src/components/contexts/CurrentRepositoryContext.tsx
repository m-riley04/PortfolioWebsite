import { createContext } from "react";
import RepositoryData from "../../classes/RepositoryData";

const CurrentRepositoryContext = createContext({
    currentRepository: new RepositoryData(),
    setCurrentRepository: (data: RepositoryData) => {}
});

export default CurrentRepositoryContext;