import RepositoryList from '../components/repository/RepositoryList.tsx';
import { useState, useRef, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import RepositoryViewer from '../components/repository/repositoryviewer/RepositoryViewer.tsx';
import RepositoryGrid from '../components/repository/repositorygrid/RepositoryGrid.tsx';
import RepositoriesPageContext from '../components/contexts/RepositoriesPageContext.ts';
import CurrentRepositoryContext from '../components/contexts/CurrentRepositoryContext.ts';
import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from "../graphql/Query.ts"
import { Repository, DefaultRepository, GITHUB_USERNAME } from "../graphql/Query.ts";
import RepositoryGridDropdown from '../components/repository/repositorygrid/RepositoryGridDropdown.tsx';

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

/**
 * The page that contains
 * 
 * Subpages:
 * - grid: Displays a grid of repositories
 * - repository: Displays information regarding a chosen repository
 */
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
    const handleSort = (sortingMethod:(a:Repository, b:Repository)=>number) => {
        if (repositories) {
            const sortedData = [...repositories].sort(sortingMethod);
            setSortedRepositories(sortedData);
        }
    }

    /** Handle the fiiltering of the repositories */
    const handleFilter = (filter:(value:Repository)=>boolean) => {
        if (repositories) {
            const sortedData = [...repositories].filter(filter);
            setSortedRepositories(sortedData);
        }
    }

    const sortOptions = [
        {title: "Name (A-Z)", callback:()=>handleSort(sortByName_Descending)},
        {title: "Name (Z-A)", callback:()=>handleSort(sortByName_Ascending)},
        {title: "Date Created (Newest)", callback:()=>handleSort(sortByDateCreated_Newest)},
        {title: "Date Created (Oldest)", callback:()=>handleSort(sortByDateCreated_Oldest)},
        {title: "Date Updated (Newest)", callback:()=>handleSort(sortByDateUpdated_Newest)},
        {title: "Date Updated (Oldest)", callback:()=>handleSort(sortByDateUpdated_Oldest)},
        {title: "Date Pushed (Newest)", callback:()=>handleSort(sortByDatePushed_Newest)},
        {title: "Date Pushed (Oldest)", callback:()=>handleSort(sortByDatePushed_Oldest)},
    ]

    const filterOptions = [
        {title: "Featured", callback:()=>handleFilter(filterFeatured)},
        {title: "Python", callback:()=>handleFilter(filterLanguage_Python)},
        {title: "C++", callback:()=>handleFilter(filterLanguage_CPP)},
        {title: "C", callback:()=>handleFilter(filterLanguage_C)},
        {title: "TypeScript", callback:()=>handleFilter(filterLanguage_TypeScript)},
        {title: "JavaScript", callback:()=>handleFilter(filterLanguage_JavaScript)},
        {title: "HTML", callback:()=>handleFilter(filterLanguage_HTML)},
    ]

    // Load the repositories from the queried data
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

        if (sortedRepositories.length <= 0) {
            return (
                <motion.div 
                    id="repositories"
                    ref={ref}

                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
                    <RepositoryList repos={repositories}/>
                    <div className="container">
                        <div className="grid-controls">
                            <RepositoryGridDropdown title="Sort" options={sortOptions}/>
                            <RepositoryGridDropdown title="Filter" options={filterOptions}/>
                        </div>
                        <h1>Repositories</h1>
                        <p>There are no repositories with that query.</p>
                        <button onClick={() => handleSort(sortByDateCreated_Newest)}>Back</button>
                    </div>
                </motion.div>
            );
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
                                <RepositoryGridDropdown title="Sort" options={sortOptions}/>
                                <RepositoryGridDropdown title="Filter" options={filterOptions}/>
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