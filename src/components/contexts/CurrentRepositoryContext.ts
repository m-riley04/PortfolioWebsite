import { createContext } from "react";
import { Repository } from "../../graphql/Query.ts";

const CurrentRepositoryContext = createContext({
    currentRepository: {},
    setCurrentRepository: (data: Repository) => {}
});

export default CurrentRepositoryContext;