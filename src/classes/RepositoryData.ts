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

    /**
     * @param {string} path The path of the folder that you would like to search in the repository. ex: "assets", "assets/images"
     * @return {string[]} The image urls found in the path folder
     */
    public getImageUrls(path:string) {
        // Build the folder URL from contents url and given path
        const folderUrl = this.getContentsUrl() + path;

        // Fetch the data of the contents
        const urls:Array<string> = [];
        fetch( folderUrl )
        .then( (response) => {
            if (!response.ok) {
                throw new Error("ERROR: Could not fetch the image urls (response was not ok)")
            }
            return response.json() 
        })
        .then( (data) => {
            // Put data into an array
            const contents = this.parseJsonToArray(data);

            // Iterate through the contents
            for (let i = 0; i < contents.length; i++) {
                const file:object = contents[i]
                const url:string = file["download_url" as keyof object];

                // Check if the file is an image
                if (url.match(/\.(jpg|jpeg|png|gif)$/i)) {
                    console.log(`Added url: ${url}`)
                    urls.push(url);
                } else {
                    console.log(`Skipping file url: ${url}`)
                }
            }
        })
        .catch((err) => (console.error(err)))

        // Return the array
        return urls;
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