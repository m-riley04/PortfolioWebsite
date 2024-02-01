/**
 * A class that stores information and method regarding a repository using the GitHub REST API
 * @deprecated Use the GitHub GraphQL API instead with Apollo 
 * 
 * @param {string} name
 * @param {string} description
 * @param {string} author
 * @param {string} dateCreated
 * @param {string} dateUpdated
 * @param {string} datePushed
 * @param {string} language
 * @param {string} topics
 * @param {string} url
 * @param {string} defaultBranch
 * @param {string} image
 * @param {boolean} featured
 */
class RepositoryData {
    public name:string;
    public description:string;
    public author:string;
    public dateCreated:string;
    public dateUpdated:string;
    public datePushed:string;
    public language:string;
    public topics:Array<string>;
    public url:string;
    public defaultBranch:string;
    public image:string;
    public featured:boolean;

    constructor(
        name:string="", 
        description:string="", 
        author:string="",
        dateCreated:string="",
        dateUpdated:string="",
        datePushed:string="",
        language:string="",
        topics:Array<string>=[],
        url:string="",
        defaultBranch:string="main",
        image:string="",
        featured:boolean=false
        ) {

        this.name           = name;
        this.description    = description;
        this.author         = author;
        this.dateCreated    = dateCreated;
        this.dateUpdated    = dateUpdated;
        this.datePushed     = datePushed;
        this.language       = language;
        this.topics         = topics;
        this.url            = url;
        this.defaultBranch  = defaultBranch;
        this.image          = image;
        this.featured       = featured;
    }

    /**
     * @return {string} The releases REST API URL of the repository
    */
    public getReleasesUrl() {
        return "https://api.github.com/repos/" + this.author + "/" + this.name + "/releases"
    }

    /**
     * @return {string} The latest release REST API URL of the repository
    */
    public getLatestReleaseUrl() {
        return "https://api.github.com/repos/" + this.author + "/" + this.name + "/releases/latest"
    }

    /**
     * @return {string} The collaborators REST API URL of the repository
    */
    public getCollaboratorsUrl() {
        return "https://api.github.com/repos/" + this.author + "/" + this.name + "/collaborators"
    }

    /**
     * @return {string} The contents folder REST API URL of the repository
    */
    public getContentsUrl() {
        return "https://api.github.com/repos/" + this.author + "/" + this.name + "/contents/"
    }

    /**
     * @return {string} The README.md url of the repository from the default branch
    */
    public getReadmeUrl() {
        return "https://raw.githubusercontent.com/" + this.author + "/" + this.name + "/" + this.defaultBranch + "/README.md";
    }

    /**
     * @param {string} path The path of the folder that you would like to search in the repository. ex: "assets", "assets/images"
     * @return {Promise<string[]>} A promise that resolves to an array of image urls
     */
    public getImageUrls(path:string): Promise<string[]> {
        const folderUrl = this.getContentsUrl() + path;
    
        return fetch(folderUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("ERROR: Could not fetch the image urls (response was not ok)")
                }
                return response.json();
            })
            .then((data) => {
                const contents = this.parseJsonToArray(data);
                return contents
                    .filter((file: any) => file["download_url"].match(/\.(jpg|jpeg|png|gif)$/i))
                    .map((file: any) => file["download_url"]);
            })
            .catch((err) => {
                console.error(err);
                return [];
            });
    }

    private parseJsonToArray(json:object) {
        const contents:Array<object> = [];
        for (var i in json) {
            // Convert each JSON to a project object
            const item = json[i as keyof object];
            contents.push(item);
        }
        
        return contents;
    }
}

export default RepositoryData;