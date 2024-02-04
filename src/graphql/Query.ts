import { gql } from "@apollo/client";

//** The GitHub username to query for repositories under */
export const GITHUB_USERNAME = "m-riley04";

export interface Collaborator {
    login: string;
    name: string;
    url: string;
    avatarUrl: string;
}

export interface Owner {
    login: string;
}

export interface Forks {
    totalCount: number;
}

export interface Language {
    name: string;
    color: string;
}

export interface User {
    login: string,
    name: string,
    bio: string,
    url: string,
    avatarUrl: string,
    email: string
}

export interface ReleaseAsset {
    url: string,
    name: string,
    size: number,
    createdAt: string,
    contentType: string,
    downloadUrl: string
}

export interface ReleaseAssets {
    totalCount: number,
    nodes: ReleaseAsset[]
}

export interface Release {
    tagName: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    url: string,
    isLatest: boolean,
    description: string,
    descriptionHTML: string,
    resourcePath: string,
    releaseAssets: ReleaseAssets
}

export interface Repository {
    name: string,
    description: string,
    visibility: string,
    url: string,
    homepageUrl: string,
    openGraphImageUrl: string,
    owner: Owner,
    forks: Forks,
    collaborators: Array<Collaborator>,
    createdAt: string,
    updatedAt: string,
    pushedAt: string,
    latestRelease: Release | undefined,
    releases: Array<Release> | undefined,
    primaryLanguage: Language,
    languages: Array<Language>,
    resourcePath: string,

    // Visual/App
    featured: boolean
}

//=== Defaults
export const DefaultCollaborator : Collaborator = {
    login: "",
    name: "",
    url: "",
    avatarUrl: "",
};

export const DefaultOwner : Owner = {
    login: ""
};

export const DefaultForks : Forks = {
    totalCount: 0
};

export const DefaultLanguage : Language ={
    name: "",
    color: ""
};

export const DefaultUser : User = {
    login: "",
    name: "",
    bio: "",
    url: "",
    avatarUrl: "",
    email: ""
};

export const DefaultRelease : Release = {
    tagName: "",
    name: "",
    createdAt: "",
    updatedAt: "",
    publishedAt: "",
    url: "",
    isLatest: false,
    description: "",
    descriptionHTML: "",
    resourcePath: "",
    releaseAssets: { totalCount: 0, nodes: [] },
};

export const DefaultRepository : Repository = {
    name: "",
    description: "",
    visibility: "",
    url: "",
    homepageUrl: "",
    openGraphImageUrl: "",
    owner: DefaultOwner,
    forks: DefaultForks,
    collaborators: [],
    createdAt: "",
    updatedAt: "",
    pushedAt: "",
    latestRelease: DefaultRelease,
    releases: [],
    primaryLanguage: {name: "", color: ""},
    languages: [{name: "", color: ""}],
    resourcePath: "",
    
    // Visual/App
    featured: false
};

//=== PROPS
const COLLABORATOR_PROPS = `
    login
    name
    url
    avatarUrl
`;

const LANGUAGE_PROPS = `
    name
    color
`;

const USER_PROPS = `
    login
    name
    bio
    url
    avatarUrl
    email
`;

const RELEASE_PROPS = `
    tagName
    name
    createdAt
    updatedAt
    publishedAt
    url
    isLatest
    description
    descriptionHTML
    releaseAssets(first: 100) {
        totalCount
        nodes {
            url
            name
            size
            createdAt
            contentType
            downloadUrl
        }
    }
`;

const REPOSITORY_PROPS = `
    name
    description
    visibility
    url
    homepageUrl
    openGraphImageUrl
    owner {
        login
    }
    forks {
        totalCount
    }
    collaborators(first: 100) {
        nodes {
            ${COLLABORATOR_PROPS}
        }
    }
    createdAt
    updatedAt
    pushedAt
    latestRelease {
        ${RELEASE_PROPS}
    }
    releases(first: 100) {
        nodes {
            ${RELEASE_PROPS}
        }
    }
    primaryLanguage {
        ${LANGUAGE_PROPS}
    }
    languages(first: 100) {
        nodes {
            ${LANGUAGE_PROPS}
        }
    }
    resourcePath
`;

//=== QUERIES =================================
// Full
/** 
 * A query to retrieve a specific repository by name and username 
 * @param {string} name
 * @param {string} username
 */
export const GET_REPOSITORY = gql`
    query getRepository($name: String!, $username: String!) {
        repository(name: $name, owner: $username) {
            ${REPOSITORY_PROPS}
        }
    }
`;

/** 
 * A query to retrieve all of a specific user's repositories
 * @param {string} username the owner's username/login
 * @param {Int} count the number of repositories to retrieve
 */
export const GET_REPOSITORIES = gql`
    query getRepositories($username: String!, $count: Int!) {
        user(login: $username) {
            repositories(first: $count) {
                totalCount
                nodes {
                    id
                    ${REPOSITORY_PROPS}
                }
            }
        }
    }
`;

/** 
 * A query to retrieve a README.md of a specified repository 
 * @param {string} repository
 * @param {string} owner
 */
export const GET_README = gql`
    query getReadme($repository: String!, $owner: String!) {
        repository(name: $repository, owner: $owner) {
            object(expression: "HEAD:README.md") {
                ... on Blob {
                    text
                }
            }
        }
    }
`;

/** 
 * A query to retrieve a README.md of a specified repository 
 * @param {string} repository
 * @param {string} owner
 * @param {string} filepath
 */
export const GET_FOLDER = gql`
    query getFolder($repository: String!, $owner: String!, $filepath: String!) {
        repository(name: $repository, owner: $owner) {
            object(expression: $filepath){
                ... on Tree {
                    entries {
                        name
                        type
                        object {
                            ... on Blob {
                                byteSize
                                text
                                isBinary
                                commitUrl
                                commitResourcePath
                            }
                        }
                    }
                }
            }
        }
    }
`;

/** 
 * A query to retrieve user data from a specified username 
 * @param {string} username
 */
export const GET_USER = gql`
    query getUser($username: String!) {
        user(login: $username) {
            ${USER_PROPS}
        }
    }
`;

/** 
 * A query to retrieve the collaborators from a specified repository 
 * @param {string} owner
 * @param {string} repository
 */
export const GET_COLLABORATORS = gql`
    query getCollaborators($owner:String!, $repository: String!) {
        repository(name: $repository, owner: $owner) {
            collaborators(first: 100) {
                totalCount
                nodes {
                    ${COLLABORATOR_PROPS}
                }
            }
        }
    }
`;

/** 
 * A query to retrieve a specific release from a specified username and repository name
 * @param {string} tag
 * @param {string} user
 * @param {string} repository
 */
export const GET_RELEASE = gql`
    query getRelease($tag: String!, $user: String!, $repository: String!) {
        user(login: $user) {
            repository(name: $repository) {
                release(tagName: $tag) {
                    ${RELEASE_PROPS}
                }
            }
        }
    }
`;