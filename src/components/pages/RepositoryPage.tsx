import RepositoryList from '../repository/RepositoryList';
import { useState, useRef, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import RepositoryViewer from '../repository/RepositoryViewer.tsx';
import RepositoryGrid from '../repository/RepositoryGrid';
import RepositoriesPageContext from '../contexts/RepositoriesPageContext';
import CurrentRepositoryContext from '../contexts/CurrentRepositoryContext.ts';
import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from "../../graphql/Query.ts"
import { Repository, DefaultRepository, GITHUB_USERNAME } from "../../graphql/Query.ts";

//** A list of repository names that will not appear on the site */
const BLACKLIST:string[] = [
    "FAP"
];
//** A list of repository names that will be given the "featured" tag */
const FEATURED:string[] = [
    "AutoSortFolder",
    "ShutterSort",
    "AsteroidsNEO",
    "ClozeShuffler",
    "LethalCompanyModpackInstaller",
    "PortfolioWebsite"
];

//#region Sorting Methods
function sortByName_Descending(a:Repository, b:Repository) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

function sortByName_Ascending(a:Repository, b:Repository) {
    if (a.name > b.name) {
        return -1;
    }
    if (a.name < b.name) {
        return 1;
    }
    return 0;
}

function sortByDateCreated_Oldest(a:Repository, b:Repository) {
    const date_a = new Date(a.createdAt);
    const date_b = new Date(b.createdAt);
    if (date_a < date_b) {
        return -1;
    }
    if (date_a > date_b) {
        return 1;
    }
    return 0;
}

function sortByDateCreated_Newest(a:Repository, b:Repository) {
    const date_a = new Date(a.createdAt);
    const date_b = new Date(b.createdAt);
    if (date_a > date_b) {
        return -1;
    }
    if (date_a < date_b) {
        return 1;
    }
    return 0;
}

function sortByDateUpdated_Oldest(a:Repository, b:Repository) {
    const date_a = new Date(a.updatedAt);
    const date_b = new Date(b.updatedAt);
    if (date_a < date_b) {
        return -1;
    }
    if (date_a > date_b) {
        return 1;
    }
    return 0;
}

function sortByDateUpdated_Newest(a:Repository, b:Repository) {
    const date_a = new Date(a.updatedAt);
    const date_b = new Date(b.updatedAt);
    if (date_a > date_b) {
        return -1;
    }
    if (date_a < date_b) {
        return 1;
    }
    return 0;
}

function sortByDatePushed_Oldest(a:Repository, b:Repository) {
    const date_a = new Date(a.pushedAt);
    const date_b = new Date(b.pushedAt);
    if (date_a < date_b) {
        return -1;
    }
    if (date_a > date_b) {
        return 1;
    }
    return 0;
}

function sortByDatePushed_Newest(a:Repository, b:Repository) {
    const date_a = new Date(a.pushedAt);
    const date_b = new Date(b.pushedAt);
    if (date_a > date_b) {
        return -1;
    }
    if (date_a < date_b) {
        return 1;
    }
    return 0;
}
//#endregion

//#region Filters
function filterInBlacklist(repo: Repository) {
    return BLACKLIST.includes(repo.name);
}

function filterNotInBlacklist(repo: Repository) {
    return !BLACKLIST.includes(repo.name);
}

function filterFeatured(repo: Repository) {
    return (repo.featured === true);
}
function filterLanguage(repo: Repository, language: string) {
    return (repo.primaryLanguage?.name.toLowerCase() === language.toLowerCase());
}
function filterLanguage_Python(repo: Repository) {
    const language : string = repo.primaryLanguage?.name;
    return (language?.toLowerCase() === "python");
}
function filterLanguage_CPP(repo: Repository) {
    const language : string = repo.primaryLanguage?.name;
    return (language?.toLowerCase() === "c++");
}
function filterLanguage_C(repo: Repository) {
    const language : string = repo.primaryLanguage?.name;
    return (language?.toLowerCase() === "c");
}
function filterLanguage_TypeScript(repo: Repository) {
    const language : string = repo.primaryLanguage?.name;
    return (language?.toLowerCase() === "typescript");
}
function filterLanguage_JavaScript(repo: Repository) {
    const language : string = repo.primaryLanguage?.name;
    return (language?.toLowerCase() === "javascript");
}
function filterLanguage_HTML(repo: Repository) {
    const language : string = repo.primaryLanguage?.name;
    return (language?.toLowerCase() === "html");
}
//#endregion

function RepositoryPage() {
    //=== References
    const ref = useRef<HTMLDivElement>(null);

    //=== API
    const { loading, error, data } = useQuery(GET_REPOSITORIES, {
        variables: {
            username: GITHUB_USERNAME,
            count: 100
        },
    });

    //=== Hooks and States
    const [repositories, setRepositories] = useState<Array<Repository>>([]);
    const [sortedRepositories, setSortedRepositories] = useState<Array<Repository>>([]);
    const [currentRepository, setCurrentRepository] = useState<Repository>(DefaultRepository);
    const currentRepositoryValue = {currentRepository, setCurrentRepository};

    const [page, setPage] = useState("grid");
    const pageValue = {page, setPage}

    /** Handle the sorting of the repositories */
    const handleSort = (sortingMethod:Function|undefined=undefined) => {
        if (repositories) {
            const sortedData = [...repositories].sort(sortingMethod);
            setSortedRepositories(sortedData);
        }
    }

    /** Handle the fiiltering of the repositories */
    const handleFilter = (filter:Function | undefined=undefined) => {
        if (repositories) {
            const sortedData = [...repositories].filter(filter);
            setSortedRepositories(sortedData);
        }
    }

    useEffect(() => {
        if (data) {
            const uneditedRepos : Array<Repository> = data["user"]["repositories"]["nodes"];
            const editedRepos : Array<Repository> = [];

            // Add "featured"
            for (let i = 0; i < uneditedRepos.length; i++) {
                editedRepos.push({
                    ...uneditedRepos[i],
                    featured: FEATURED.includes(uneditedRepos[i].name)
                });
            }

            // Set the repositories, filter out the blacklist, and sort them by newest
            setRepositories(editedRepos.filter(filterNotInBlacklist).sort(sortByDateCreated_Newest));
            setSortedRepositories(editedRepos.filter(filterNotInBlacklist).sort(sortByDateCreated_Newest));
        }
    }, [data]);

    // Elements to render if the query is loading
    if (loading) return ( 
        <motion.div 
            id="repositories"
            ref={ref}

            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <RepositoryList/>
            <div className="container">
                <h1>Repositories</h1>
                <p>Loading repositories...</p>
            </div>
        </motion.div>
    );

    // Elements to render if the query return an error
    if (error) return ( 
        <motion.div 
            id="repositories"
            ref={ref}

            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <RepositoryList/>
            <div className="container">
            <h1>Repositories</h1>
                <p>Error: {error.message}</p>
            </div>
        </motion.div>
    );

    // Elements to render if the query returns data
    if (data) {
        /**
         * @type {string : JSX.Element} A map/hash table of the subpages within the RepositoryPage
         * @param {string} name A string of the page's target name
         * @param {JSX.Element} value A JSX element that contains the page's info
         * 
         * Current pages:
         * - grid - the repository grid
         * - repository - the repository viewer
         */
        const pages : {[name : string] : JSX.Element} = {
            "grid": <RepositoryGrid repos={sortedRepositories}/>,
            "repository": <RepositoryViewer repo={currentRepository} parent={ref} />
        }

        return (
            <RepositoriesPageContext.Provider value={pageValue}>
                <CurrentRepositoryContext.Provider value={currentRepositoryValue}>
                    <motion.div 
                        id="repositories"
                        ref={ref}

                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <RepositoryList repos={repositories} />
                        <div className="container">
                            <div className="grid-controls">
                                <Dropdown>
                                    <Dropdown.Toggle className="clickable">
                                        Sort By
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => {
                                            handleSort(sortByName_Descending);
                                        }}>Name (A-Z)</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            handleSort(sortByName_Ascending);
                                        }}>Name (Z-A)</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            handleSort(sortByDateCreated_Newest);
                                        }}>Date Created (Newest)</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            handleSort(sortByDateCreated_Oldest);
                                        }}>Date Created (Oldest)</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            handleSort(sortByDateUpdated_Newest);
                                        }}>Date Updated (Newest)</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            handleSort(sortByDateUpdated_Oldest);
                                        }}>Date Updated (Oldest)</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            handleSort(sortByDatePushed_Newest);
                                        }}>Date Pushed (Newest)</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            handleSort(sortByDatePushed_Oldest);
                                        }}>Date Pushed (Oldest)</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown >
                                    <Dropdown.Toggle className="clickable">
                                        Filter By Language
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => {
                                                handleFilter(filterLanguage_Python);
                                        }}>Python</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                                handleFilter(filterLanguage_CPP);
                                        }}>C++</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                                handleFilter(filterLanguage_C);
                                        }}>C</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                                handleFilter(filterLanguage_TypeScript);
                                        }}>TypeScript</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                                handleFilter(filterLanguage_JavaScript);
                                        }}>JavaScript</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                                handleFilter(filterLanguage_HTML);
                                        }}>HTML</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown >
                                    <Dropdown.Toggle className="clickable">
                                        Other Filters
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => {
                                                handleFilter(filterFeatured);
                                        }}>Featured</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                            {pages[pageValue.page]}
                        </div>
                    </motion.div>
                </CurrentRepositoryContext.Provider>
            </RepositoriesPageContext.Provider>
        );
    }
}

export default RepositoryPage;