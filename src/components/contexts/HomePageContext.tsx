import { createContext } from "react";

const HomePageContext = createContext({
    page: "#",
    setPage: (page: string) => {}
});

export default HomePageContext;