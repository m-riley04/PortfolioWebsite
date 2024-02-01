import { gql } from "@apollo/client";

//** The GitHub username to query for repositories under */
export const GITHUB_USERNAME = "m-riley04";

export interface Collaborator {
    login: string;
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

export interface Release {
    tagName: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date,
    url: string,
    isLatest: boolean,
    description: string,
    descriptionHTML: string,
    resourcePath: string
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
    createdAt: Date,
    updatedAt: Date,
    pushedAt: Date,
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
    login: ""
}

export const DefaultOwner : Owner = {
    login: ""
}

export const DefaultForks : Forks = {
    totalCount: 0
}

export const DefaultLanguage : Language ={
    name: "",
    color: ""
}

export const DefaultUser : User = {
    login: "",
    name: "",
    bio: "",
    url: "",
    avatarUrl: "",
    email: ""
}

export const DefaultRelease : Release = {
    tagName: "",
    name: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date(),
    url: "",
    isLatest: false,
    description: "",
    descriptionHTML: "",
    resourcePath: ""
}

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
    createdAt: new Date(),
    updatedAt: new Date(),
    pushedAt: new Date(),
    latestRelease: DefaultRelease,
    releases: [],
    primaryLanguage: {name: "", color: ""},
    languages: [{name: "", color: ""}],
    resourcePath: "",
    
    // Visual/App
    featured: false
}

//=== PROPS
const COLLABORATOR_PROPS = `
    login
`

const LANGUAGE_PROPS = `
    name
    color
`

const USER_PROPS = `
    login
    name
    bio
    url
    avatarUrl
    email
`

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
    resourcePath
`

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
`

//=== QUERIES =================================
// Full
//** A query to retrieve a specific repository by name and username */
export const GET_REPOSITORY = gql`
    query getRepository($name: String!, $username: String!) {
        repository(name: $name, owner: $username) {
            ${REPOSITORY_PROPS}
        }
    }
`;

//** A query to retrieve all of a specific user's repositories */
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

//** A query to retrieve a README.md of a specified repository */
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

//** A query to retrieve a README.md of a specified repository */
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

//** A query to retrieve user data from a specified username */
export const GET_USER = gql`
    query getUser($username: String!) {
        user(login: $username) {
            ${USER_PROPS}
        }
    }
`;

//** A query to retrieve a specific release from a specified username and repository name*/
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