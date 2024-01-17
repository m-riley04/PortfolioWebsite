import { createContext } from "react";

const HomePageContext = createContext({
    page: "#home",
    setPage: (page: string) => {}
});

export default HomePageContext;