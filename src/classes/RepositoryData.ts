class RepositoryData {
    name:string;
    description:string;
    author:string;
    dateCreated:string;
    dateUpdated:string;
    datePushed:string;
    language:string;
    topics:Array<string>;
    url:string;
    defaultBranch:string;
    image:string;

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
        image:string=""
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