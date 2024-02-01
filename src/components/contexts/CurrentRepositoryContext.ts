import { createContext } from "react";
import { Repository } from "../../graphql/Query.ts";

/**
 * The context of the currently selected repository for the RepositoryPage
 */
const CurrentRepositoryContext = createContext({
    currentRepository: {},
    setCurrentRepository: (data: Repository) => {}
});

export default CurrentRepositoryContext;