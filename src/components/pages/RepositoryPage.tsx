import RepositoryData from '../../classes/RepositoryData';
import RepositoryList from '../repository/RepositoryList';
import { useState, useRef } from 'react';
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
function sortByName_Descending(a:RepositoryData, b:RepositoryData) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

function sortByName_Ascending(a:RepositoryData, b:RepositoryData) {
    if (a.name > b.name) {
        return -1;
    }
    if (a.name < b.name) {
        return 1;
    }
    return 0;
}

function sortByDateCreated_Oldest(a:RepositoryData, b:RepositoryData) {
    const date_a = new Date(a.dateCreated);
    const date_b = new Date(b.dateCreated);
    if (date_a < date_b) {
        return -1;
    }
    if (date_a > date_b) {
        return 1;
    }
    return 0;
}

function sortByDateCreated_Newest(a:RepositoryData, b:RepositoryData) {
    const date_a = new Date(a.dateCreated);
    const date_b = new Date(b.dateCreated);
    if (date_a > date_b) {
        return -1;
    }
    if (date_a < date_b) {
        return 1;
    }
    return 0;
}

function sortByDateUpdated_Oldest(a:RepositoryData, b:RepositoryData) {
    const date_a = new Date(a.dateUpdated);
    const date_b = new Date(b.dateUpdated);
    if (date_a < date_b) {
        return -1;
    }
    if (date_a > date_b) {
        return 1;
    }
    return 0;
}

function sortByDateUpdated_Newest(a:RepositoryData, b:RepositoryData) {
    const date_a = new Date(a.dateUpdated);
    const date_b = new Date(b.dateUpdated);
    if (date_a > date_b) {
        return -1;
    }
    if (date_a < date_b) {
        return 1;
    }
    return 0;
}

function sortByDatePushed_Oldest(a:RepositoryData, b:RepositoryData) {
    const date_a = new Date(a.datePushed);
    const date_b = new Date(b.datePushed);
    if (date_a < date_b) {
        return -1;
    }
    if (date_a > date_b) {
        return 1;
    }
    return 0;
}

function sortByDatePushed_Newest(a:RepositoryData, b:RepositoryData) {
    const date_a = new Date(a.datePushed);
    const date_b = new Date(b.datePushed);
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
function filterFeatured(repo: RepositoryData) {
    return (repo.featured === true);
}
function filterLanguage(repo: RepositoryData, language: string) {
    return (repo.language.toLowerCase() === language.toLowerCase());
}
function filterLanguage_Python(repo: RepositoryData) {
    return (repo.language.toLowerCase() === "python");
}
function filterLanguage_CPP(repo: RepositoryData) {
    console.log(repo.language.toLowerCase() === "c++");
    return (repo.language.toLowerCase() === "c++");
}
function filterLanguage_C(repo: RepositoryData) {
    return (repo.language.toLowerCase() === "c");
}
function filterLanguage_TypeScript(repo: RepositoryData) {
    return (repo.language.toLowerCase() === "typescript");
}
function filterLanguage_JavaScript(repo: RepositoryData) {
    return (repo.language.toLowerCase() === "javascript");
}
function filterLanguage_HTML(repo: RepositoryData) {
    return (repo.language.toLowerCase() === "html");
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
    const [currentRepository, setCurrentRepository] = useState<Repository>(DefaultRepository);
    const currentRepositoryValue = {currentRepository, setCurrentRepository};

    const [page, setPage] = useState("grid");
    const pageValue = {page, setPage}

    /** Handle the refreshing of the repositories */
    const handleRefresh = (sortingMethod:Function | undefined=undefined, filter:Function | undefined=undefined) => {

    }

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
                <p>Loading...</p>
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
            "grid": <RepositoryGrid repos={data["user"]["repositories"]["nodes"]}/>,
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
                        <RepositoryList repos={data["user"]["repositories"]["nodes"]} />
                        <div className="container">
                            <div className="grid-controls">
                                <button onClick={() => handleRefresh()}>Refresh</button>

                                <Dropdown>
                                    <Dropdown.Toggle className="clickable">
                                        Sort By
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => {
                                            handleRefresh(sortByName_Descending);
                                        }}>Name (A-Z)</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            handleRefresh(sortByName_Ascending);
                                        }}>Name (Z-A)</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            handleRefresh(sortByDateCreated_Newest);
                                        }}>Date Created (Newest)</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            handleRefresh(sortByDateCreated_Oldest);
                                        }}>Date Created (Oldest)</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            handleRefresh(sortByDateUpdated_Newest);
                                        }}>Date Updated (Newest)</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            handleRefresh(sortByDateUpdated_Oldest);
                                        }}>Date Updated (Oldest)</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            handleRefresh(sortByDatePushed_Newest);
                                        }}>Date Pushed (Newest)</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            handleRefresh(sortByDatePushed_Oldest);
                                        }}>Date Pushed (Oldest)</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown >
                                    <Dropdown.Toggle className="clickable">
                                        Filter By Language
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => {
                                                handleRefresh(undefined, filterLanguage_Python);
                                        }}>Python</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                                handleRefresh(undefined, filterLanguage_CPP);
                                        }}>C++</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                                handleRefresh(undefined, filterLanguage_C);
                                        }}>C</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                                handleRefresh(undefined, filterLanguage_TypeScript);
                                        }}>TypeScript</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                                handleRefresh(undefined, filterLanguage_JavaScript);
                                        }}>JavaScript</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                                handleRefresh(undefined, filterLanguage_HTML);
                                        }}>HTML</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown >
                                    <Dropdown.Toggle className="clickable">
                                        Other Filters
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => {
                                                handleRefresh(undefined, filterFeatured);
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