import { createContext } from "react";
import RepositoryData from "../../classes/RepositoryData";

const RepositoriesContext = createContext({
    repositories: [],
    setRepositories: (data: [RepositoryData]) => {}
});

export default RepositoriesContext;