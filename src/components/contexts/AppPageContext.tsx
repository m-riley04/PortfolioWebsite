import { createContext } from "react";

const AppPageContext = createContext({
    page: "#home",
    setPage: (page: string) => {}
});

export default AppPageContext;