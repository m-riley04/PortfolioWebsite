/*
The card that will be displayed within the ProjectGrid. Contains information about a portfolio project.

Parameters:
    - title: The title of the project
    - description: A short description of the project
    - image: A thumbnail/logo of the project
*/
function RepositoryCard({title="Project Name", description="This is the project description.", image=""}) {
    return (
        <div className="card">
            <img src={data.image} hidden={!data.image}></img>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}

export default RepositoryCard;