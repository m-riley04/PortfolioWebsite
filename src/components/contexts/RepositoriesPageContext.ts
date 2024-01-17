import { createContext } from "react";

const RepositoriesPageContext = createContext({
    page: "#grid",
    setPage: (page: string) => {}
});

export default RepositoriesPageContext;