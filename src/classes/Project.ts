class Project {
    name:string;
    description:string;
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
        dateCreated:string="",
        dateUpdated:string="",
        datePushed:string="",
        language:string="",
        topics:Array<string>=[],
        url:string="",
        image:string=""
        ) {

        this.name = name;
        this.description = description;
        this.dateCreated = dateCreated;
        this.dateUpdated = dateUpdated;
        this.datePushed = datePushed;
        this.language = language;
        this.topics = topics;
        this.url = url;
        this.image = image;
    }
}

export default Project;