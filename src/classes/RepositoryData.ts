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
        this.image          = image;
    }

    public getReleasesUrl() : string {
        return "https://api.github.com/repos/" + this.author + "/" + this.name + "/releases"
    }

    /*
    Returns the latest release URL of the project.
    */
    public getLatestReleaseUrl() : string {
        return "https://api.github.com/repos/" + this.author + "/" + this.name + "/releases/latest"
    }
}

export default RepositoryData;