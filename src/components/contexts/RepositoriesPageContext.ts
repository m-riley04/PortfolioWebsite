import { createContext } from "react";

/**
 * The context of the currently displayed sub-page of the RepositoryPage
 */
const RepositoriesPageContext = createContext({
    page: "#grid",
    setPage: (page: string) => {}
});

export default RepositoriesPageContext;