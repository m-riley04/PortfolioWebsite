/*
The card that will be displayed within the ProjectGrid. Contains information about a portfolio project.

Parameters:
    - title: The title of the project
    - description: A short description of the project
    - image: A thumbnail/logo of the project
*/
function ProjectCard({title="Project Name", description="This is the project description.", image=""}) {
    return (
        <div className="container card">
            <img src={image} width="200px" height="200px"></img>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default ProjectCard;